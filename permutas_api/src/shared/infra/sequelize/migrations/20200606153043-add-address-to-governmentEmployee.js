module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'government_employees',
      'institution_address_id',
      {
        type: Sequelize.UUID,
        references: { model: 'addresses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'government_employees',
      'institution_address_id'
    );
  },
};
