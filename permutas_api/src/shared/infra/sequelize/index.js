import Sequelize from 'sequelize';

import User from '../../../modules/users/infra/models/User';
import Institution from '../../../modules/institutions/infra/models/Institution';
import Position from '../../../modules/positions/infra/models/Position';
import Role from '../../../modules/positions/infra/models/Role';
import GovernmentEmployee from '../../../modules/governmentEmployee/infra/models/GovernmentEmployee';
import Interest from '../../../modules/interests/infra/models/Interest';
import Match from '../../../modules/matches/infra/models/Match';
import Address from '../../../modules/address/infra/models/Address';
import StatusMatch from '../../../modules/statusMatch/infra/models/StatusMatch';
import SolicitationMatch from '../../../modules/solicitations/infra/models/SolicitationMatch';

import databaseConfig from '../../../config/database';

const models = [
  User,
  Institution,
  Position,
  GovernmentEmployee,
  Interest,
  Match,
  Address,
  StatusMatch,
  SolicitationMatch,
  Role,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associete && model.associete(this.connection.models));
  }
}

export default new Database();
