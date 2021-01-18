import CreateGovernmentEmployeeService from '../../../services/CreateGovernmentEmployeeService';
import ListGovernmentEmployeeService from '../../../services/ListGovernmentEmployeeService';
import GetGovernmentEmployeeService from '../../../services/GetGovernmentEmployeeService';
import CreateGovernmentEmployeeByCpf from '../../../services/CreateGovernmentEmployeeByCpfService';

class GovernmentEmployeeController {
  async store(request, response) {
    const createGovernmentEmployeeService = new CreateGovernmentEmployeeService();

    const {
      position,
      institution,
      state,
      city,
      name,
      allocation,
      role,
    } = request.body;

    const employeeDTO = {
      user: request.userId,
      position,
      institution,
      state,
      city,
      name,
      allocation,
      role,
    };

    const employee = await createGovernmentEmployeeService.execute(employeeDTO);

    return response.json(employee);
  }

  async index(request, response) {
    const listGovernmentEmployeeService = new ListGovernmentEmployeeService();

    const employees = await listGovernmentEmployeeService.execute();

    return response.json(employees);
  }

  async indexOne(request, response) {
    const getGovernmentEmployeeService = new GetGovernmentEmployeeService();
    const { userId } = request;
    const employee = await getGovernmentEmployeeService.execute({ userId });
    return response.json(employee);
  }

  async FindByCPF(request, response) {
    const { cpf } = request.query;
    const { userId: user } = request;

    const createGovernmentEmployeeService = new CreateGovernmentEmployeeByCpf();

    const employee = await createGovernmentEmployeeService.execute({
      user,
      cpf,
    });

    return response.json(employee);
  }
}

export default new GovernmentEmployeeController();
