import Interest from '../infra/models/Interest';
import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';
import Institution from '../../institutions/infra/models/Institution';
import Address from '../../address/infra/models/Address';

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

    const interest = await Interest.findAll({
      where: { government_employee_id: id },
      include: [
        {
          model: Institution,
          as: 'institution',
          attributes: ['id', 'name', 'campus'],
        },
        {
          model: Address,
          as: 'destinationAddress',
          attributes: ['id', 'region', 'state', 'city', 'neighborhood']
        }
      ],
      attributes: ['id', 'government_employee_id', 'created_at', 'updated_at'],
    });

    return interest;
  }
}

export default ListInterestService;
