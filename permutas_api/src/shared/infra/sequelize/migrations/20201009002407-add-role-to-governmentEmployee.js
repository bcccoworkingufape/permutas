module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('government_employees', 'role_id', {
      type: Sequelize.UUID,
      references: { model: 'roles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('government_employees', 'role_id');
  },
};
