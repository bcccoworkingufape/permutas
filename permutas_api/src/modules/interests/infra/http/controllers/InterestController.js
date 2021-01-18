import CreateInterestService from '../../../services/CreateInterestService';
import ListInterestService from '../../../services/ListInterestService';

import CreateAddressService from '../../../../address/services/CreateAddressService';
import DeleteInterestService from '../../../services/DeleteInterestService';

class InterestController {
  async store(request, response) {
    const createInterestService = new CreateInterestService();
    const createAddressService = new CreateAddressService();

    // cria o endereço de destino
    const address = await createAddressService.execute({
      region: request.body.region,
      state: request.body.state,
      city: request.body.city,
      neighborhood: request.body.neighborhood,
    });

    const insterestDTO = {
      userId: request.userId,
      institution: request.body.institution,
      address: address.id,
    };

    const interest = await createInterestService.execute(insterestDTO);

    return response.json(interest);
  }

  async index(request, response) {
    const listInterestService = new ListInterestService();

    const { userId } = request;

    const interests = await listInterestService.execute({ userId });

    return response.json(interests);
  }

  async delete(request, response) {
    const deleteInterestService = new DeleteInterestService();

    const { id } = request.params;

   await deleteInterestService.execute({ interestId: id });

    return response.status(200).send();
  }
}

export default new InterestController();
