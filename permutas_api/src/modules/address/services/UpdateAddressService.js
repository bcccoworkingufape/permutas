import Address from '../infra/models/Address';

import AppError from '../../../shared/errors/AppError';

class UpdateAddressService {
  async execute(address) {
    const addressFound = await Address.findByPk(address.id_address);

    if (!addressFound) {
      throw new AppError('Address not found');
    }

    const { id, city, neighborhood, state, region } = await Address.update(
      address,
      {
        where: { id: address.id_address },
      }
    );

    return { id, city, neighborhood, state, region };
  }
}

export default UpdateAddressService;
