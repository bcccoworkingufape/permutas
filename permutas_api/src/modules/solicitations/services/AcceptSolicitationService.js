import SolicitationMatch from '../infra/models/SolicitationMatch';

import CreateMatchService from '../../matches/services/CreateMatchService';

import AppError from '../../../shared/errors/AppError';

class AcceptSolicitationService {
  async execute({ solicitation_id, user_id }) {
    const status_pending = 'afc0bdbd-e43c-4f42-9191-df4c8b71e892';
    const status_confirmed = '31d3e1d4-dee9-49a5-82e2-39620d51b638';

    const solicitationExists = await SolicitationMatch.findOne({
      where: { id: solicitation_id },
      include: [
        { association: 'governmentEmployeeSender' },
        { association: 'governmentEmployeeReceiver' },
      ],
    });

    if (!solicitationExists) {
      throw new AppError('Solicitation not exists');
    }

    if (solicitationExists.status_match_id !== status_pending) {
      throw new AppError('This solicitation is not pending');
    }

    if (solicitationExists.governmentEmployeeReceiver.user_id !== user_id) {
      throw new AppError('This user cannot accept this solicitation', 401);
    }

    await SolicitationMatch.update(
      { status_match_id: status_confirmed },
      {
        where: { id: solicitation_id },
      }
    );

    const createMatchService = new CreateMatchService();

    const {
      governmentEmployeeSender,
      governmentEmployeeReceiver,
    } = solicitationExists;

    await createMatchService.execute({
      government_employee_1_id: governmentEmployeeSender.id,
      government_employee_2_id: governmentEmployeeReceiver.id,
    });
  }
}

export default AcceptSolicitationService;
