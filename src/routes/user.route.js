import express from 'express';
import * as userController from '../controllers/user.controller';
// import { newUserValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('/find_user', userController.getAllUsers);

//route to create a new user
router.post('/register_user', userController.newUser);

//route to verify user
router.post('/verify_user', userController.verifyUser);

//route to verify user
router.post('/verify_email', userController.verifyEmail);

//route to get a single user by their user id
router.get('/get_user/:id', userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
