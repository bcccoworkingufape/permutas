import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Interest extends Model {
  static init(sequelize) {
    super.init(
      {
        government_employee_id: Sequelize.UUID,
        institution_id: Sequelize.UUID,
        destination_address_id: Sequelize.UUID
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async interest => {
      interest.id = uuid();
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.GovernmentEmployee, {
      foreignKey: 'government_employee_id',
      as: 'governmentEmployee',
    });
    this.belongsTo(models.Institution, {
      foreignKey: 'institution_id',
      as: 'institution',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'destination_address_id',
      as: 'destinationAddress',
    });
  }
}

export default Interest;
