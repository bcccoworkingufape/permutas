const local = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'permutas',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

const online = {
  dialect: 'postgres',
  host: 'bd_permutas.postgresql.dbaas.com.br',
  username: 'bd_permutas',
  password: 'BCC11UFAPE18.',
  database: 'bd_permutas',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

module.exports = online;
