import { Router } from 'express';

import AddressController from '../controllers/AddressController';

import CreateAddressMiddleware from '../middlewares/validations/CreateAddressMiddleware';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.post('/', CreateAddressMiddleware, AddressController.store);

routes.put('/', AddressController.update);

export default routes;
