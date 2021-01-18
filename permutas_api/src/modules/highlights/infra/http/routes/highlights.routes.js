import { Router } from 'express';

import HighlightsController from '../controllers/HighlightsController';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.get('/', HighlightsController.index);

export default routes;
