import { isUuid } from 'uuidv4';

import Interest from '../infra/models/Interest';

import AppError from '../../../shared/errors/AppError';


class DeleteInterestService {
  async execute({ interestId }) {
    if (!isUuid(interestId)) {
      throw new AppError('invalid id');
    }

    const result = await Interest.destroy({
      where: {
        id: interestId
      }
    });

    if (result === 0) {
      throw new AppError('unable to remove interest');
    }

    return true;
  }
}

export default DeleteInterestService;