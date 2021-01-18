import { Router } from 'express';

import InstitutionController from '../controllers/InstitutionController';

import CreateInstitutionMiddleware from '../middlewares/validations/CreateInstitutionMiddleware';
import ListInstitutionsMiddleware from '../middlewares/validations/ListInstitutionsMiddleware';

import authMiddleware from '../../../../users/infra/http/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.post('/', CreateInstitutionMiddleware, InstitutionController.store);
routes.get('/', ListInstitutionsMiddleware, InstitutionController.index);

routes.get('/import', InstitutionController.import);

export default routes;
