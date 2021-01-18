import { isUuid } from 'uuidv4';

import Match from '../infra/models/Match';

import AppError from '../../../shared/errors/AppError';

class DeleteMatchService {
  async execute({ matchId }) {
    if (!isUuid(matchId)) {
      throw new AppError('invalid id');
    }

    const result = await Match.destroy({
      where: {
        id: matchId,
      },
    });

    if (result === 0) {
      throw new AppError('unable to remove match');
    }

    return true;
  }
}

export default DeleteMatchService;
