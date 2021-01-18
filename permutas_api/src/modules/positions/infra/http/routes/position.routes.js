import { Router } from 'express';

import PositionController from '../controllers/PositionController';

import CreatePositionMiddleware from '../middlewares/validations/CreatePositionMiddleware';
import ListPositionMiddleware from '../middlewares/validations/ListPositionMiddleware';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);
routes.post('/', CreatePositionMiddleware, PositionController.store);

routes.use(ListPositionMiddleware);

routes.get('/', PositionController.index);
routes.get('/name', PositionController.listByName);

routes.put('/', PositionController.update);

export default routes;
