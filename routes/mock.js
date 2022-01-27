const { isAdmin } = require('../middleware/auth');
const { createMockUser } = require('../controllers/mock');

const router = require('express').Router();
router.route('/create_user').post( isAdmin, createMockUser );

module.exports = router;