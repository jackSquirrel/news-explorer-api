const router = require('express').Router();
const { getUser } = require('../controllers/user');
const { getUserValid } = require('../constants/validation');

router.get('/me', getUserValid, getUser);

module.exports = router;
