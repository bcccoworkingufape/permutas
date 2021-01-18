module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'status_matches',
      [
        {
          id: 'afc0bdbd-e43c-4f42-9191-df4c8b71e892',
          description: 'Pendente',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '31d3e1d4-dee9-49a5-82e2-39620d51b638',
          description: 'Confirmado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'c10488ad-7cae-4051-ba4f-0868dae86427',
          description: 'Recusado',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status_matches', null, {});
  },
};
