import { Router } from 'express';

import GovernmentEmployeeController from '../controllers/GovernmentEmployeeController';

import CreateGovernmentEmployeeMiddleware from '../middlewares/validations/CreateGovernmentEmployeeMiddleware';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();
routes.get('/cpf', GovernmentEmployeeController.FindByCPF);

routes.use(authMiddleware);

routes.get('/', GovernmentEmployeeController.index);

routes.get('/employee', authMiddleware, GovernmentEmployeeController.indexOne);

routes.post(
  '/',
  CreateGovernmentEmployeeMiddleware,
  GovernmentEmployeeController.store
);

export default routes;
