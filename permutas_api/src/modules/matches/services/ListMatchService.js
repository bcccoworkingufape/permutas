import Match from '../infra/models/Match';
import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';

import AppError from '../../../shared/errors/AppError';

class ListInterestService {
  async execute({ userId }) {
    const employeeExist = await GovernmentEmployee.findOne({
      where: { user_id: userId },
    });

    if (!employeeExist) {
      throw new AppError('user is not a government employee');
    }

    const { id } = employeeExist;

    const matchs_1 = await Match.findAll({
      include: [
        {
          association: 'governmentEmployee_1',
          where: { id },
        },
        {
          association: 'governmentEmployee_2',
        },
      ],
    });

    const matchs_2 = await Match.findAll({
      include: [
        {
          association: 'governmentEmployee_1',
        },
        {
          association: 'governmentEmployee_2',
          where: { id },
        },
      ],
    });

    const match = matchs_1.concat(matchs_2);

    return match;
  }
}

export default ListInterestService;
