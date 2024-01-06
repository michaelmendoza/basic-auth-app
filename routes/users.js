const UsersController = require('../controllers/users');
const { isAuthorized, isAdmin } = require('../middleware/auth');

const router = require('express').Router();
router.route('/').get( isAuthorized, UsersController.find );
router.route('/:username').get( isAuthorized, UsersController.findOneByUsername );
router.route('/find/').post( isAuthorized, UsersController.findOne );
router.route('/create').post( UsersController.create );
router.route('/update').post( isAuthorized, UsersController.update );
router.route('/delete').delete( isAdmin, UsersController.deleteOne );

module.exports = router;