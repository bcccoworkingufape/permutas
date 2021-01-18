import SolicitationMatch from '../infra/models/SolicitationMatch';

import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';
import Interest from '../../interests/infra/models/Interest';

class CreateSolicitationService {
  async execute({ userId, interest_id }) {
    const governmentEmployeeSender = await GovernmentEmployee.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!governmentEmployeeSender) {
      throw new Error('User is not government employee');
    }

    const interest = await Interest.findOne({
      where: {
        id: interest_id,
      },
    });

    if (!interest) {
      throw new Error('Interest not found');
    }

    const statusPendente = 'afc0bdbd-e43c-4f42-9191-df4c8b71e892';

    const solicitationMatch = await SolicitationMatch.create({
      government_employee_sender_id: governmentEmployeeSender.id,
      government_employee_receiver_id: interest.government_employee_id,
      status_match_id: statusPendente,
    });

    return solicitationMatch;
  }
}

export default CreateSolicitationService;
