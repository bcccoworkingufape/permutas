module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'government_employee', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'government_employee');
  },
};
