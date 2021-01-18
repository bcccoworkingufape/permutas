import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Match extends Model {
  static init(sequelize) {
    super.init(
      {
        government_employee_1_id: Sequelize.UUID,
        government_employee_2_id: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async match => {
      match.id = uuid();
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'government_employee_1_id',
      as: 'governmentEmployee_1',
    });
    this.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'government_employee_2_id',
      as: 'governmentEmployee_2',
    });
  }
}

export default Match;
