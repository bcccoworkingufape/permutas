import Axios from 'axios';

const api = Axios.create({
  // baseURL: 'http://localhost:3333',
  // baseURL: 'http://192.168.1.11:3333'
  baseURL: 'https://permutas.rj.r.appspot.com/',
  timeout: 9999,
  timeoutErrorMessage: "Falha de conexão",
});

export default api;
