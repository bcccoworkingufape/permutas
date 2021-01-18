import GovernmentEmployee from '../infra/models/GovernmentEmployee';

import User from '../../users/infra/models/User';
import Institution from '../../institutions/infra/models/Institution';
import Position from '../../positions/infra/models/Position';

import AppError from '../../../shared/errors/AppError';

class ListGovernmentEmployeeService {
  async execute() {
    const employees = await GovernmentEmployee.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Institution,
          as: 'institution',
          attributes: ['id', 'name', 'campus', 'acronym'],
        },
        {
          model: Position,
          as: 'position',
          attributes: ['id', 'name', 'titration', 'qualification'],
        },
      ],
      attributes: ['id', 'created_at', 'updated_at'],
    });

    return employees;
  }
}

export default ListGovernmentEmployeeService;
