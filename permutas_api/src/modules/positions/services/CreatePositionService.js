import Position from '../infra/models/Position';

class CreatePositionService {
  async execute({ name }) {
    const positon = await Position.create({
      name,
    });

    return positon;
  }
}

export default CreatePositionService;
