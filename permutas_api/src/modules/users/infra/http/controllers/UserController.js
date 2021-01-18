import CreateUserService from '../../../services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import CreateSessionService from '../../../services/CreateSessionService';
import GetUserService from '../../../services/GetUserService';
import ChangePasswordService from '../../../services/ChangePasswordService';

class UserController {
  async store(req, res) {
    const { email, name, password } = req.body;

    const createUserService = new CreateUserService();
    const createSessionService = new CreateSessionService();

    const { id } = await createUserService.execute({
      email,
      name,
      password,
    });

    const session = await createSessionService.execute({ email, password });

    return res.status(201).json({
      id,
      email,
      name,
      session,
    });
  }

  async update(req, res) {
    const user = req.body;
    user.userId = req.userId;

    user.government_employee = user.isGovernmentEmployee;

    const updateUserService = new UpdateUserService();

    const {
      id,
      name,
      email,
      isGovernmentEmployee,
    } = await updateUserService.execute(user);

    return res.json({
      id,
      name,
      email,
      isGovernmentEmployee,
    });
  }

  async changePassword(req, res) {
    const user = req.body;
    user.userId = req.userId;

    user.government_employee = user.isGovernmentEmployee;

    const changePasswordService = new ChangePasswordService();

    await changePasswordService.execute(user);

    return res.send();
  }

  async index(req, res) {
    const getUser = new GetUserService();
    const { userId } = req;
    const user = await getUser.execute({ userId });
    return res.json(user);
  }
}

export default new UserController();
