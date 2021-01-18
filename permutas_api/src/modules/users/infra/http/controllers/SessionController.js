import CreateSessionService from '../../../services/CreateSessionService';

class SessionController {
  async store(req, res) {
    const createSessionService = new CreateSessionService();

    const session = await createSessionService.execute(req.body);

    return res.json(session);
  }
}

export default new SessionController();
