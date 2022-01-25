// FONTE: Função baseada no que foi visto no Course
module.exports = (error, _req, res, _next) => {
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const statusByErrorCode = {
      notFound: 404,
      alreadyExists: 409,
    };
  
    const status = statusByErrorCode[error.code] || 500;
  
    res.status(status).json({ error: { message: error.message } });
  };