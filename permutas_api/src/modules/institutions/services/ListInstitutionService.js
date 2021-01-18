import { Op } from 'sequelize';
import Institution from '../infra/models/Institution';

class ListInstitutionsService {
  async execute({ page = 1, name = '' }) {
    console.log(name);

    const institutions = await Institution.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return institutions;
  }
}

export default ListInstitutionsService;
