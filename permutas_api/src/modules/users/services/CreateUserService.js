import User from '../infra/models/User';
import AppError from '../../../shared/errors/AppError';

class CreateUserService {
  async execute({ email, name, password }) {
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      throw new AppError('Email address already used.');
    }
    const user = await User.create({
      email,
      name,
      password,
      government_employee: false,
    });

    return user;
  }
}

export default CreateUserService;
