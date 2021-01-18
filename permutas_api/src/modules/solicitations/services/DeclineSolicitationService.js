import SolicitationMatch from '../infra/models/SolicitationMatch';

import AppError from '../../../shared/errors/AppError';

class DeclineSolicitationService {
  async execute({ solicitation_id, user_id }) {
    const status_pending = 'afc0bdbd-e43c-4f42-9191-df4c8b71e892';
    const status_decline = 'c10488ad-7cae-4051-ba4f-0868dae86427';

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
      { status_match_id: status_decline },
      {
        where: { id: solicitation_id },
      }
    );
  }
}

export default DeclineSolicitationService;
