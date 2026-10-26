const notFound = (req, res) => {
  return res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Invalid value for field ${err.path}: ${err.value}` });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = {
  notFound,
  errorHandler,
};
