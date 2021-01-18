import Sequelize, { Op } from 'sequelize';
import Position from '../infra/models/Position';

class ListPisitionNameService {
  async execute({ name = '', page = 1 }) {
    const PositionName = await Position.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']],

      limit: 20,
      offset: (page - 1) * 20,
    });

    return PositionName;
  }
}

export default ListPisitionNameService;
