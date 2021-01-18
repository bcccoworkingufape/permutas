import User from '../infra/models/User';
import AppError from '../../../shared/errors/AppError';

class ChangePasswordService {
  async execute(userDTO) {
    const { oldPassword } = userDTO;

    const user = await User.findByPk(userDTO.userId);

    if (!(await user.checkPassword(oldPassword))) {
      throw new AppError('Password does not match.', 401);
    }

    await user.update(userDTO);
  }
}

export default ChangePasswordService;
