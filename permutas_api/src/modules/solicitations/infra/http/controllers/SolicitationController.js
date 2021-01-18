import CreateSolicitationService from '../../../services/CreateSolicitationService';
import ListSolicitationService from '../../../services/ListSolicitationService';
import AcceptSolicitationService from '../../../services/AcceptSolicitationService';
import DeclineSolicitationService from '../../../services/DeclineSolicitationService';

class SolicitationController {
  async store(request, response) {
    const createSolicitationService = new CreateSolicitationService();

    const { userId } = request;
    const { interest_id } = request.body;

    const solicitationMatch = await createSolicitationService.execute({
      userId,
      interest_id,
    });

    return response.json(solicitationMatch);
  }

  async index(request, response) {
    const listSolicitationService = new ListSolicitationService();

    const { userId } = request;

    const solicitationMatches = await listSolicitationService.execute({
      userId,
    });

    return response.json(solicitationMatches);
  }

  async accept(request, response) {
    const acceptSolicitationService = new AcceptSolicitationService();

    const { id } = request.params;
    const { userId } = request;

    await acceptSolicitationService.execute({
      solicitation_id: id,
      user_id: userId,
    });

    return response.send();
  }

  async decline(request, response) {
    const declineSolicitationService = new DeclineSolicitationService();

    const { id } = request.params;
    const { userId } = request;

    await declineSolicitationService.execute({
      solicitation_id: id,
      user_id: userId,
    });

    return response.send();
  }
}

export default new SolicitationController();
