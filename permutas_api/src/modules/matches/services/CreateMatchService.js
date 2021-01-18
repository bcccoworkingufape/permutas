import Match from '../infra/models/Match';

class CreateMatchService {
  async execute({ government_employee_1_id, government_employee_2_id }) {
    const match = await Match.create({
      government_employee_1_id,
      government_employee_2_id,
    });

    return match;
  }
}
export default CreateMatchService;
