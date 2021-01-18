import { Op } from 'sequelize';

import Interest from '../../interests/infra/models/Interest';
import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';
import Institution from '../../institutions/infra/models/Institution';
import Address from '../../address/infra/models/Address';
import Position from '../../positions/infra/models/Position';
import User from '../../users/infra/models/User';

import AppError from '../../../shared/errors/AppError';

class ListHighlightsService {
  async execute({ userId, state, city, institution }) {
    const employeeExist = await GovernmentEmployee.findOne({
      where: { user_id: userId },
    });

    if (!employeeExist) {
      throw new AppError('user is not a government employee');
    }

    // caso seja passado os filtros são adicionados
    // em array para que sejam adicionados na consulta
    const filterInstitution = [];
    const filterAddres = [];

    // o state pode vim como 'null' não sei pq, mas buga tudo se n tiver esse if
    if (state && state !== 'null') {
      filterAddres.push({
        state,
      });

      if (city) {
        filterAddres.push({
          city,
        });
      }
    }

    if (institution) {
      filterInstitution.push({
        name: institution,
      });
    }

    const { id } = employeeExist;

    // busca todos os interesses cadastrados exceto os proprios interesses.
    const highlights = await Interest.findAll({
      where: {
        government_employee_id: {
          [Op.ne]: id,
        },
      },
      include: [
        {
          model: Institution,
          as: 'institution',
          attributes: ['id', 'name', 'campus'],
          where: {
            [Op.and]: filterInstitution,
          },
        },
        {
          model: Address,
          as: 'destinationAddress',
          attributes: ['id', 'region', 'state', 'city', 'neighborhood'],
          where: {
            [Op.and]: filterAddres,
          },
        },
        {
          model: GovernmentEmployee,
          as: 'governmentEmployee',
          attributes: ['id', 'position_id', 'institution_id'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name', 'email'],
            },
            {
              model: Address,
              as: 'institutionAddress',
            },
            {
              model: Position,
              as: 'position',
            },
          ],
        },
      ],
      attributes: ['id', 'government_employee_id', 'created_at', 'updated_at'],
    });

    return highlights;
  }
}

export default ListHighlightsService;
