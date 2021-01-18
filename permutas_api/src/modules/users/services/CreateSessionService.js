import jwt from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import User from '../infra/models/User';
import AppError from '../../../shared/errors/AppError';

class CreateSessionService {
  async execute({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError('User not found');
    }
    if (!(await user.checkPassword(password))) {
      throw new AppError('Password does not match');
    }

    const { id, name, government_employee } = user;
    return {
      user: {
        id,
        name,
        email,
        isGovernmentEmployee: !!government_employee,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export default CreateSessionService;
