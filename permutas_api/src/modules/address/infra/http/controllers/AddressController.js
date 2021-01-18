import CreateAddressService from '../../../services/CreateAddressService';
import UpdateAddressService from '../../../services/UpdateAddressService';

class AddressController {
  async store(request, response) {
    const createAddressService = new CreateAddressService();

    const address = await createAddressService.execute(request.body);

    return response.json(address);
  }

  async update(request, response) {
    const address = request.body;

    const updateAddressService = new UpdateAddressService();

    const {
      id,
      city,
      neighborhood,
      state,
      region,
    } = await updateAddressService.execute(address);

    return response.json({
      id,
      city,
      neighborhood,
      state,
      region,
    });
  }
}

export default new AddressController();
