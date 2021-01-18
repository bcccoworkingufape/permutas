import User from '../infra/models/User';
import AppError from '../../../shared/errors/AppError';

class GetUserService {
  async execute({ userId }) {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default GetUserService;
