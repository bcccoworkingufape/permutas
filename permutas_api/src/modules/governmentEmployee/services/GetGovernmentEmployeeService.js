import GovernmentEmployee from '../infra/models/GovernmentEmployee';

class GetGovernmentEmployeeService {
  async execute({ userId }) {
    const employees = await GovernmentEmployee.findOne({
      where: { user_id: userId },
      include: [
        { association: 'user' },
        { association: 'institution' },
        { association: 'position' },
        { association: 'institutionAddress' },
      ],
      attributes: ['id', 'created_at', 'updated_at'],
    });

    return employees;
  }
}

export default GetGovernmentEmployeeService;
