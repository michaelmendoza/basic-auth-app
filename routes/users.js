const UsersController = require('../controllers/users');
const { isAdmin } = require('../middleware/auth');

const router = require('express').Router();
router.route('/').get( UsersController.find );
router.route('/:id').get( UsersController.findOne );
router.route('/:username').get( UsersController.findOneByUsername );
router.route('/create').post( UsersController.create );
router.route('/update').post( UsersController.update );

module.exports = router;