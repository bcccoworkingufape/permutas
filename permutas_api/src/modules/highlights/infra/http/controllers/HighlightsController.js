import ListHighlightsService from '../../../services/ListHighlightsService';

class HighlightsController {
  async index(request, response) {
    const listHighlightsService = new ListHighlightsService();

    const { userId } = request;
    const { state, city, institution } = request.query;

    const highlights = await listHighlightsService.execute({
      userId,
      state,
      city,
      institution,
    });

    return response.json(highlights);
  }
}

export default new HighlightsController();
