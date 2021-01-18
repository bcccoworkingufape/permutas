import Interest from '../infra/models/Interest';
import GovernmentEmployee from '../../governmentEmployee/infra/models/GovernmentEmployee';
import Institution from '../../institutions/infra/models/Institution';
import User from '../../users/infra/models/User';

import AppError from '../../../shared/errors/AppError';

import CreateMatchesService from '../../matches/services/CreateMatchesService';

class CreateInterestService {
  async execute({ userId, institution, address }) {
    console.log('alou');
    const employeeExist = await GovernmentEmployee.findOne({
      where: { user_id: userId },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Institution,
          as: 'institution',
          attributes: ['name'],
        },
      ],
    });
    if (!employeeExist) {
      throw new AppError('user is not a government employee');
    }

    const { id: government_employee_id, institution_id } = employeeExist;

    const institutionExist = await Institution.findOne({
      where: { id: institution },
    });

    if (!institutionExist) {
      throw new AppError('institution does not exists', 404);
    }

    const interestCreate = {
      government_employee_id,
      institution_id: institution,
      destination_address_id: address,
    };

    const interest = await Interest.create(interestCreate);

    // id da instituição de interesse e id da instituição que ele trabalha

    // const matches = await this.findMatch(institution, institution_id);

    // // pega os usuariso que estão vinculados ao match
    // const users = matches.map(employee => employee.governmentEmployee.user_id);

    // // pega o email dos destinatarios
    // const recipients = matches.map(user => user.governmentEmployee.user.email);
    // const [matchEmployee] = matches;

    // const newSender = {
    //   institutionName: matchEmployee.governmentEmployee.institution.name,
    //   username: matchEmployee.governmentEmployee.user.name,
    //   email: matchEmployee.governmentEmployee.user.email,
    // };

    // let response = [];

    // if (matches && matches.length > 0) {
    //   const matchesService = new CreateMatchesService();

    //   response = await matchesService.execute({
    //     interest_1: interest.id,
    //     interests: matches,
    //     employee: employeeExist,
    //     recipients,
    //     newTemplate: newSender,
    //   });
    // }

    return { interest };
  }

  // async findMatch(institution, institution_id) {
  //   const matches = await Interest.findAll({
  //     where: { institution_id },
  //     include: [
  //       {
  //         model: GovernmentEmployee,
  //         as: 'governmentEmployee',
  //         where: { institution_id: institution },
  //         include: [
  //           {
  //             model: User,
  //             as: 'user',
  //             attributes: ['id', 'email', 'name'],
  //           },
  //           {
  //             model: Institution,
  //             as: 'institution',
  //             attributes: ['name'],
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   return matches;
  // }
}

export default CreateInterestService;
