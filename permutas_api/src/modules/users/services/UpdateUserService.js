import User from '../infra/models/User';
import AppError from '../../../shared/errors/AppError';

class UpdateUserService {
  async execute(userDTO) {
    const { email } = userDTO;

    const user = await User.findByPk(userDTO.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });

      if (userExist) {
        throw new AppError('This email is already be taken');
      }
    }
    // if (oldPassword && !(await user.checkPassword(oldPassword))) {
    //   // return res.status(401).json({ error: 'Password does not match.' });
    //   throw new AppError('Password does not match.', 401);
    // }

    const { id, name, government_employee } = await user.update(userDTO);

    return { id, name, email, isGovernmentEmployee: !!government_employee };
  }
}

export default UpdateUserService;
