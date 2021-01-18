import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class SolicitationMatch extends Model {
  static init(sequelize) {
    super.init(
      {
        government_employee_sender_id: Sequelize.UUID,
        government_employee_receiver_id: Sequelize.UUID,
        status_match_id: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async solicitation_match => {
      solicitation_match.id = uuid();
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'government_employee_sender_id',
      as: 'governmentEmployeeSender',
    });
    this.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'government_employee_receiver_id',
      as: 'governmentEmployeeReceiver',
    });
    this.belongsTo(models.StatusMatch, {
      foreignKey: 'status_match_id',
      as: 'statusMatch',
    });
  }
}

export default SolicitationMatch;
