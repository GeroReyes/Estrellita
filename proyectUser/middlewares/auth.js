const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization === 'Bearer mi_secreto') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = { authenticate };
  