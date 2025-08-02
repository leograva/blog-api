// Middleware de tratamento de erros personalizado

class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware para capturar erros não tratados
const globalErrorHandler = (err, req, res, next) => {
  let { statusCode = 500, message, details } = err;

  // Log do erro completo para debugging
  console.error('=== ERRO CAPTURADO ===');
  console.error('Timestamp:', new Date().toISOString());
  console.error('Method:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('Headers:', req.headers);
  console.error('Body:', req.body);
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    code: err.code,
    severity: err.severity,
    detail: err.detail,
    hint: err.hint,
    position: err.position,
    where: err.where,
    file: err.file,
    line: err.line,
    routine: err.routine
  });
  console.error('=== FIM DO ERRO ===');

  // Tratamento específico para erros de banco PostgreSQL
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        statusCode = 409;
        message = 'Dados duplicados encontrados';
        details = {
          error_code: err.code,
          constraint: err.constraint,
          detail: err.detail
        };
        break;
      case '23503': // Foreign key violation
        statusCode = 400;
        message = 'Referência inválida encontrada';
        details = {
          error_code: err.code,
          constraint: err.constraint,
          detail: err.detail
        };
        break;
      case '23502': // Not null violation
        statusCode = 400;
        message = 'Campo obrigatório não informado';
        details = {
          error_code: err.code,
          column: err.column,
          table: err.table
        };
        break;
      case '22P02': // Invalid text representation
        statusCode = 400;
        message = 'Formato de dados inválido';
        details = {
          error_code: err.code,
          detail: err.detail
        };
        break;
      case '08000': // Connection exception
      case '08003': // Connection does not exist
      case '08006': // Connection failure
        statusCode = 503;
        message = 'Erro de conexão com o banco de dados';
        details = {
          error_code: err.code,
          detail: 'Serviço temporariamente indisponível'
        };
        break;
      default:
        statusCode = 500;
        message = 'Erro interno do servidor';
        details = {
          error_code: err.code,
          detail: err.detail,
          hint: err.hint
        };
    }
  }

  // Resposta de erro detalhada
  const errorResponse = {
    status: 'error',
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };

  // Adiciona detalhes apenas em desenvolvimento ou se for erro operacional
  if (process.env.NODE_ENV === 'development' || err.isOperational) {
    if (details) errorResponse.details = details;
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  }

  res.status(statusCode).json(errorResponse);
};

// Middleware para capturar rotas não encontradas
const notFoundHandler = (req, res, next) => {
  const err = new AppError(`Rota ${req.originalUrl} não encontrada`, 404);
  next(err);
};

// Função para asyncHandler - elimina a necessidade de try/catch em controllers
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  AppError,
  globalErrorHandler,
  notFoundHandler,
  asyncHandler
};
