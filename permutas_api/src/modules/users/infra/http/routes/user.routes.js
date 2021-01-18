import { Router } from 'express';

import UserController from '../controllers/UserController';

import authMiddleware from '../middlewares/auth';
import CreateUserMiddleware from '../middlewares/validations/CreateUserMiddleware';
import UpdateUserMiddleware from '../middlewares/validations/UpdateUserMiddleware';
import ChangePasswordMiddleware from '../middlewares/validations/ChangePasswordMiddleware';

const routes = new Router();

routes.post('/users', CreateUserMiddleware, UserController.store);

routes.put(
  '/users',
  authMiddleware,
  UpdateUserMiddleware,
  UserController.update,
);

routes.put(
  '/users/password',
  authMiddleware,
  ChangePasswordMiddleware,
  UserController.changePassword,
);

routes.get('/users/profile', authMiddleware, UserController.index);

export default routes;
