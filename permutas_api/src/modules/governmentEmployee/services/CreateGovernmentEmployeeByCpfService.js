import api from '../../../shared/services/apiPortalDaTransparencia';
import crawler from '../../../shared/services/crawlerPortalTransparencia';

import AppError from '../../../shared/errors/AppError';

class CreateGovernmentEmployeeService {
  async execute({ cpf }) {
    const result = await this.oneSuccess([
      this.findGovernmentApi({ cpf }),
      this.findGovernmentCrawler({ cpf }),
    ]);

    return result;
  }

  async findGovernmentApi({ cpf }) {
    try {
      const response = await api.get(`servidores?cpf=${cpf}&pagina=1`);
      const [, data] = response.data;

      const servidor = {};

      const [fichasCargoEfetivo] = data.fichasCargoEfetivo;

      servidor.name = fichasCargoEfetivo.nome;
      servidor.position = fichasCargoEfetivo.cargo;
      servidor.role = fichasCargoEfetivo.uorgExercicio;
      servidor.institution = fichasCargoEfetivo.orgaoLotacao;
      servidor.allocation = fichasCargoEfetivo.uorgLotacao;
      servidor.state = data.fichasFuncao[0].ufExercicio;

      return servidor;
    } catch (err) {
      throw Error('Servidor não encontrado');
    }
  }

  async findGovernmentCrawler({ cpf }) {
    try {
      const response = await crawler({ cpf });

      if (response.error) {
        throw Error('Servidor não encontrado');
      }

      return response;
    } catch (err) {
      throw Error('Servidor não encontrado');
    }
  }

  oneSuccess(promises) {
    return Promise.all(
      promises.map(p => {
        return p.then(
          val => Promise.reject(val),
          err => Promise.resolve(err)
        );
      })
    ).then(
      errors => Promise.reject(errors),
      val => Promise.resolve(val)
    );
  }
}

export default CreateGovernmentEmployeeService;
