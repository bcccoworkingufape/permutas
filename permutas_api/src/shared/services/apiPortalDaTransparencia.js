import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://api.portaldatransparencia.gov.br/api-de-dados/',
  headers: {
    Accept: '*/*',
    'chave-api-dados': '3730e9a0a3e0960b002bc343c8f00018',
  },
});

export default api;
