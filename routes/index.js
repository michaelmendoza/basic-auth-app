const { isAuthorized } = require('../middleware/auth');

const router = require('express').Router();

router.use('/api', (req, res) => { res.send(['Welcome to API']) });
router.use('/login', require('./login'));
router.use('/users', isAuthorized, require('./users'));
router.use('/mock', isAuthorized, require('./mock'));
router.use('/test', isAuthorized, (req, res) => { res.redirect('https://app.example.io') });

module.exports = router;