module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('matches', 'interest_1_id');
    queryInterface.removeColumn('matches', 'interest_2_id');

    queryInterface.addColumn('matches', 'government_employee_1_id', {
      type: Sequelize.UUID,
      references: { model: 'government_employees', key: 'id' },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    return queryInterface.addColumn('matches', 'government_employee_2_id', {
      type: Sequelize.UUID,
      references: { model: 'government_employees', key: 'id' },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('matches', 'government_employee_1_id');
    queryInterface.removeColumn('matches', 'government_employee_2_id');

    queryInterface.addColumn('matches', 'interest_1_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'interests', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    return queryInterface.addColumn('matches', 'interest_2_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'interests', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
