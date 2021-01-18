import Match from '../infra/models/Match';

import mail from '../../../shared/services/mailService';
import mailMatch from '../../../shared/templates/match';

class CreateMatchService {
  async execute({ interest_1, interests, employee, recipients, newTemplate }) {
    const matchesDTO = interests.map(interest => ({
      interest_1_id: interest_1,
      interest_2_id: interest.id,
    }));

    const matches = await Match.bulkCreate(matchesDTO, {
      returning: true,
      individualHooks: true,
    });

    const mailTemplate = mailMatch(
      employee.institution.name,
      employee.user.name,
      employee.user.email
    );
    const userMailTemplate = mailMatch(
      newTemplate.institutionName,
      newTemplate.username,
      newTemplate.email
    );

    mail(recipients, 'Nova permuta encontrada', mailTemplate);
    mail([employee.user.email], 'Nova permuta encontrada', userMailTemplate);

    return matches;
  }
}
export default CreateMatchService;
