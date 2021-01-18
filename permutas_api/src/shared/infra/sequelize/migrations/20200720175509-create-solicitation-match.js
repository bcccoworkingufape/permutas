module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitation_matches', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      government_employee_sender_id: {
        type: Sequelize.UUID,
        references: { model: 'government_employees', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      government_employee_receiver_id: {
        type: Sequelize.UUID,
        references: { model: 'government_employees', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      status_match_id: {
        type: Sequelize.UUID,
        references: { model: 'status_matches', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('solicitation_matches');
  },
};
