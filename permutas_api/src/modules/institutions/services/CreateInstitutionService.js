import Institution from '../infra/models/Institution';
import AppError from '../../../shared/errors/AppError';

class CreateInstitutionService {
  async execute({ name, campus }) {
    const institution = await Institution.create({
      name,
      campus,
    });

    return institution;
  }
}

export default CreateInstitutionService;
