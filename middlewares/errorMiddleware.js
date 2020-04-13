const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  res.status(err.statusCode || 500).send({ message: err.message });
};

module.exports = {
  errorMiddleware
};
