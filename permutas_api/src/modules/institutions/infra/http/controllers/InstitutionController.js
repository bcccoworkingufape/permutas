import CreateInstitutionService from '../../../services/CreateInstitutionService';
import ImportInstitutionService from '../../../services/ImporInstitutionService';
import ListInstitutionsService from '../../../services/ListInstitutionService';

class InstitutionController {
  async store(req, res) {
    const createInstitutionService = new CreateInstitutionService();

    const institution = await createInstitutionService.execute(req.body);

    return res.json(institution);
  }

  async index(req, res) {
    const { page, name } = req.query;
    console.log(name);

    const listInstitutionsService = new ListInstitutionsService();
    const institutions = await listInstitutionsService.execute({ name, page });

    return res.json(institutions);
  }

  async import(req, res) {
    const importInstitutionService = new ImportInstitutionService();

    const institution = await importInstitutionService.execute();

    return res.json(institution);
  }
}

export default new InstitutionController();
