import Position from '../../models/Position';

import ListPositionNameService from '../../../services/ListPositionNameService';
import CreatePositionService from '../../../services/CreatePositionService';
import UpdatePositionService from '../../../services/UpdatePositionService';

class PositionController {
  async store(request, response) {
    const createPositionService = new CreatePositionService();

    const position = await createPositionService.execute(request.body);

    return response.json(position);
  }

  async index(request, response) {
    const positions = await Position.findAll();

    return response.json(positions);
  }

  async update(request, response) {
    const position = request.body;

    const updatePositionService = new UpdatePositionService();

    const { id, name, descripition } = await updatePositionService.execute(
      position
    );

    return response.json({
      id,
      name,
      descripition,
    });
  }

  async listByName(request, response) {
    const { name, page } = request.query;

    const listPositionNameService = new ListPositionNameService();

    const positions = await listPositionNameService.execute({ name, page });

    return response.json(positions);
  }
}

export default new PositionController();
