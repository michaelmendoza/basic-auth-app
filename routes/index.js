const { isAuthorized } = require('../middleware/auth');

const router = require('express').Router();

router.use('/api', (req, res) => { res.send(['Welcome to API']) });
router.use('/test', (req, res) => { res.redirect('https://app.example.io') });
router.use('/login', require('./login'));
router.use('/users', require('./users'));

module.exports = router;