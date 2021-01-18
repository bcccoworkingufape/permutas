import StatusMatch from '../infra/models/StatusMatch';

// import AppError from '../../../shared/errors/AppError';

class ListStatusMatchService {
  async execute() {
    const statusMatchList = await StatusMatch.findAll();

    return statusMatchList;
  }
}

export default ListStatusMatchService;
