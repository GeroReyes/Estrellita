const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/users', authenticate, UserController.getAllUsers);
router.get('/users/:id', authenticate, UserController.getUserById);
router.post('/users', authenticate, validateUser, UserController.createUser);
router.put('/users/:id', authenticate, validateUser, UserController.updateUser);
router.delete('/users/:id', authenticate, UserController.deleteUser);
router.get('/excel', UserController.downloadUsersExcel);

module.exports = router;
