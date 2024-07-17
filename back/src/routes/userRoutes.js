import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;
