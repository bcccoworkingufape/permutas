import Address from '../infra/models/Address';

class CreateAddressService {
  async execute({ region, state, city, neighborhood }) {
    const address = await Address.create({
      region,
      state,
      city,
      neighborhood,
    });

    return { id: address.id };
  }
}

export default CreateAddressService;
