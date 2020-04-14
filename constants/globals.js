const { NODE_ENV, JWT_SECRET, BASE } = process.env;
if (NODE_ENV === 'production') {
  const key = JWT_SECRET;
  const base = BASE;
  module.exports = {
    key,
    base
  };
} else {
  const key = 'some-secret-key';
  const base = 'mongodb://localhost:27017/explorer';

  module.exports = {
    key,
    base
  };
}
