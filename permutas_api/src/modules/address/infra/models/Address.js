import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        region: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async address => {
      address.id = uuid();
    });

    return this;
  }
}

export default Address;
