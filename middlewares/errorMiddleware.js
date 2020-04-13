const errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
};

module.exports = {
  errorMiddleware
};
