import { Router } from 'express';

import UserRoutes from '../../../../modules/users/infra/http/routes/user.routes';
import SessionRoutes from '../../../../modules/users/infra/http/routes/session.routes';
import InstitutionRoutes from '../../../../modules/institutions/infra/http/routes/institution.routes';
import PositionRoutes from '../../../../modules/positions/infra/http/routes/position.routes';
import GovernmentEmployeeRoutes from '../../../../modules/governmentEmployee/infra/http/routes/governemtEmployee.routes';
import InterestRoutes from '../../../../modules/interests/infra/http/routes/interest.routes';
import MatchRoutes from '../../../../modules/matches/infra/http/routes/match.routes';
import AddressRoutes from '../../../../modules/address/infra/http/routes/address.routes';
import HighlightsRoutes from '../../../../modules/highlights/infra/http/routes/highlights.routes';
import SolicitationsRoutes from '../../../../modules/solicitations/infra/http/routes/solicitations.routes';

const routes = new Router();

routes.use(UserRoutes);
routes.use(SessionRoutes);
routes.use('/institution', InstitutionRoutes);
routes.use('/position', PositionRoutes);
routes.use('/government-employee', GovernmentEmployeeRoutes);
routes.use('/interest', InterestRoutes);
routes.use('/match', MatchRoutes);
routes.use('/address', AddressRoutes);
routes.use('/highlights', HighlightsRoutes);
routes.use('/solicitations', SolicitationsRoutes);

export default routes;
