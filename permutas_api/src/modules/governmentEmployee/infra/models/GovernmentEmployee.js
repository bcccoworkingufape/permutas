import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class GovernmentEmployee extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.UUID,
        position_id: Sequelize.UUID,
        role_id: Sequelize.UUID,
        institution_id: Sequelize.UUID,
        institution_address_id: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async employee => {
      employee.id = uuid();
    });

    return this;
  }

  static associete(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    this.belongsTo(models.Position, {
      foreignKey: 'position_id',
      as: 'position',
    });

    this.belongsTo(models.Institution, {
      foreignKey: 'institution_id',
      as: 'institution',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'institution_address_id',
      as: 'institutionAddress',
    });

    this.belongsTo(models.Address, {
      foreignKey: 'role_id',
      as: 'role',
    });
  }
}

export default GovernmentEmployee;
