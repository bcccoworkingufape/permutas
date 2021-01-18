import { Router } from 'express';

import InterestController from '../controllers/InterestController';

import CreateInterestMiddleware from '../middlewares/validations/CreateInterestMiddleware';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.get('/', InterestController.index);

routes.post('/', CreateInterestMiddleware, InterestController.store);

routes.delete('/:id', InterestController.delete);

export default routes;
