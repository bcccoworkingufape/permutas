/* eslint-disable no-await-in-loop */

import Institution from '../infra/models/Institution';
import api from '../../../shared/services/apiPortalDaTransparencia';

import AppError from '../../../shared/errors/AppError';

class CreateInstitutionService {
  async execute() {
    try {
      const page = 1;

      // eslint-disable-next-line no-constant-condition
      const responseArray = await Promise.all([
        await api.get(`/orgaos-siafi?pagina=${1}`),
        await api.get(`/orgaos-siafi?pagina=${2}`),
        await api.get(`/orgaos-siafi?pagina=${3}`),
        await api.get(`/orgaos-siafi?pagina=${4}`),
        await api.get(`/orgaos-siafi?pagina=${5}`),
        await api.get(`/orgaos-siafi?pagina=${6}`),
        await api.get(`/orgaos-siafi?pagina=${7}`),
        await api.get(`/orgaos-siafi?pagina=${8}`),
        await api.get(`/orgaos-siafi?pagina=${9}`),
        await api.get(`/orgaos-siafi?pagina=${10}`),
        await api.get(`/orgaos-siafi?pagina=${11}`),
        await api.get(`/orgaos-siafi?pagina=${12}`),
        await api.get(`/orgaos-siafi?pagina=${13}`),
        await api.get(`/orgaos-siafi?pagina=${14}`),
        await api.get(`/orgaos-siafi?pagina=${15}`),
        await api.get(`/orgaos-siafi?pagina=${16}`),
        await api.get(`/orgaos-siafi?pagina=${17}`),
        await api.get(`/orgaos-siafi?pagina=${18}`),
        await api.get(`/orgaos-siafi?pagina=${19}`),
        await api.get(`/orgaos-siafi?pagina=${20}`),
        await api.get(`/orgaos-siafi?pagina=${21}`),
        await api.get(`/orgaos-siafi?pagina=${22}`),
        await api.get(`/orgaos-siafi?pagina=${23}`),
        await api.get(`/orgaos-siafi?pagina=${24}`),
        await api.get(`/orgaos-siafi?pagina=${25}`),
        await api.get(`/orgaos-siafi?pagina=${26}`),
        await api.get(`/orgaos-siafi?pagina=${27}`),
        await api.get(`/orgaos-siafi?pagina=${28}`),
        await api.get(`/orgaos-siafi?pagina=${29}`),
        await api.get(`/orgaos-siafi?pagina=${30}`),
        await api.get(`/orgaos-siafi?pagina=${31}`),
        await api.get(`/orgaos-siafi?pagina=${32}`),
        await api.get(`/orgaos-siafi?pagina=${33}`),
        await api.get(`/orgaos-siafi?pagina=${34}`),
        await api.get(`/orgaos-siafi?pagina=${35}`),
        await api.get(`/orgaos-siafi?pagina=${36}`),
        await api.get(`/orgaos-siafi?pagina=${37}`),
        await api.get(`/orgaos-siafi?pagina=${38}`),
        await api.get(`/orgaos-siafi?pagina=${39}`),
      ]);

      console.log(responseArray);
      let institutionsData = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const response of responseArray) {
        institutionsData = institutionsData.concat(response.data);
      }

      const institutionsFormated = institutionsData.map(institution => ({
        name: institution.descricao,
      }));

      const institutions = await Institution.bulkCreate(institutionsFormated, {
        returning: true,
        individualHooks: true,
      });

      return institutions;
    } catch (err) {
      // console.log(err);
      throw new AppError(err.toString());
    }
  }
}

export default CreateInstitutionService;
