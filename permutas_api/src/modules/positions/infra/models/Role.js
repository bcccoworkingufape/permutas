import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async role => {
      role.id = uuid();
    });

    return this;
  }
}

export default Role;
