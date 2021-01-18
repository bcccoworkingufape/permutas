import GovernmentEmployee from '../infra/models/GovernmentEmployee';
import AppError from '../../../shared/errors/AppError';

import CreateAddressService from '../../address/services/CreateAddressService';
import UpdateUserService from '../../users/services/UpdateUserService';

import Position from '../../positions/infra/models/Position';
import Role from '../../positions/infra/models/Role';

import Institution from '../../institutions/infra/models/Institution';

class CreateGovernmentEmployeeService {
  async execute({
    user,
    position,
    institution,
    state,
    city,
    name,
    allocation,
    role,
  }) {
    // verifica se já é um servidor
    const employeeExist = await GovernmentEmployee.findOne({
      where: { user_id: user },
    });

    if (employeeExist) {
      throw new AppError('User is already a government employee');
    }

    // cadastra o endereço
    const createAddressService = new CreateAddressService();

    const address = {
      city,
      state,
    };

    const { id: idAddress } = await createAddressService.execute(address);

    // atualiza o nome do usuario e que ele é servidor
    const updateUserService = new UpdateUserService();
    const updatedUser = await updateUserService.execute({
      userId: user,
      name,
      government_employee: true,
    });

    // procura ou cria cargo
    const [{ id: position_id }] = await Position.findOrCreate({
      where: { name: position },
      defaults: { name: position },
    });
    const [{ id: role_id }] = await Role.findOrCreate({
      where: { name: role },
      defaults: { name: role },
    });

    // procura ou cria instituição
    const [{ id: institution_id }] = await Institution.findOrCreate({
      where: { name: institution, campus: allocation },
      defaults: { name: institution, campus: allocation },
    });

    const governmentEmployee = await GovernmentEmployee.create({
      user_id: user,
      position_id,
      role_id,
      institution_id,
      institution_address_id: idAddress,
    });

    return governmentEmployee;
  }
}

export default CreateGovernmentEmployeeService;
