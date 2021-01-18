import { Router } from 'express';

import CreateSolicitationMiddleware from '../middlewares/validations/CreateSolicitationMiddleware';
import SolicitationController from '../controllers/SolicitationController';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.get('/', SolicitationController.index);

routes.post('/', CreateSolicitationMiddleware, SolicitationController.store);

routes.put('/:id/accept', SolicitationController.accept);

routes.put('/:id/decline', SolicitationController.decline);

export default routes;
