import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://www.transparencia.gov.br/api-de-dados/',
  headers: {
    Accept: '*/*',
    'chave-api-dados': '66305882b5475289e6052870f587ed5b',
  },
});

export default api;
