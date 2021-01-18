import { Router } from 'express';

import MatchController from '../controllers/MatchController';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.get('/', MatchController.index);

routes.delete('/:id', MatchController.delete);

export default routes;
