module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('interests', 'destination_address_id', {
      type: Sequelize.UUID,
      references: { model: 'addresses', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('interests', 'destination_address_id');
  },
};
