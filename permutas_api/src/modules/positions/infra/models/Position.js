import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Position extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async position => {
      position.id = uuid();
    });

    return this;
  }
}

export default Position;
