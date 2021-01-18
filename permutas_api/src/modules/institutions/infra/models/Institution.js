import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Institution extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        campus: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async institution => {
      institution.id = uuid();
    });

    return this;
  }
}

export default Institution;
