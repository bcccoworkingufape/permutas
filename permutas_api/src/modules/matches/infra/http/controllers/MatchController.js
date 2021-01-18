import ListMatchService from '../../../services/ListMatchService';
import MatchDeleteService from '../../../services/DeleteMatchService';

class MatchController {
  async index(request, response) {
    const listMatchService = new ListMatchService();
    const { userId } = request;
    const matches = await listMatchService.execute({ userId });
    return response.json(matches);
  }

  async delete(request, response) {
    const deleteMatchService = new MatchDeleteService();
    const { id } = request.params;
    await deleteMatchService.execute({ matchId: id });
    return response.status(200).send();
  }
}

export default new MatchController();
