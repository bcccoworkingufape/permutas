import { Op } from 'sequelize';

import SolicitationMatch from '../infra/models/SolicitationMatch';

import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';

class ListSolicitationService {
  async execute({ userId }) {
    const governmentEmployee = await GovernmentEmployee.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!governmentEmployee) {
      throw new Error('User is not government employee');
    }

    const solicitationMatches = await SolicitationMatch.findAll({
      where: {
        [Op.or]: [
          { government_employee_sender_id: governmentEmployee.id },
          { government_employee_receiver_id: governmentEmployee.id },
        ],
      },
      include: [
        {
          association: 'governmentEmployeeSender',
          include: [
            {
              association: 'user',
              attributes: ['id', 'name', 'email'],
            },
            { association: 'position' },
            { association: 'institution' },
            { association: 'institutionAddress' },
          ],
        },
        {
          association: 'governmentEmployeeReceiver',
          include: [
            {
              association: 'user',
              attributes: ['id', 'name', 'email'],
            },
            { association: 'position' },
            { association: 'institution' },
            { association: 'institutionAddress' },
          ],
        },
        { association: 'statusMatch', attributes: ['id', 'description'] },
      ],
    });

    return solicitationMatches;
  }
}

export default ListSolicitationService;
