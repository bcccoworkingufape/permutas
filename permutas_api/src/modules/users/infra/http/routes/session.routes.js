import { Router } from 'express';

import SessionController from '../controllers/SessionController';

import SessionMiddleware from '../middlewares/validations/SessionMiddleware';

const routes = new Router();

routes.post('/session', SessionMiddleware, SessionController.store);

export default routes;
