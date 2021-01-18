import Match from '../infra/models/Match';

class CreateMatchService {
  async execute({ interest_1, interests }) {
    const matchesDTO = interests.map(interest => ({
      interest_1_id: interest_1,
      interest_2_id: interest.id,
    }));

    const matches = await Match.bulkCreate(matchesDTO, {
      returning: true,
      individualHooks: true,
    });

    return matches;
  }
}
export default CreateMatchService;
