import Position from '../infra/models/Position';

import AppError from '../../../shared/errors/AppError';

class UpdatePositionService {
  async execute(position) {
    const positionFound = await Position.findByPk(position.id_position);

    if (!positionFound) {
      throw new AppError('Position not found');
    }

    const { id, name, descripition } = await Position.update(position, {
      where: { id: position.id_position },
    });

    return { id, name, descripition };
  }
}

export default UpdatePositionService;
