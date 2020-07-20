import shortid from 'shortid';

import { CardsDeck } from '../models/deck';
import { CardsItem } from '../models/card';

export class DeckController {
  static async getDeck (request, response) {
    try {
      const { id, userId } = request.params;
      const databaseResponse = await CardsDeck.findOne(
        { $and: [
          { id },
          { userId }
      ]});
      
      response.status(200).json(databaseResponse);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async createDeck (request, response) {
    try {
      const { name, description, userId } = request.body;
      const databaseResponse = await new CardsDeck({ id: shortid(), name, description, userId }).save();
  
      response.status(201).json(databaseResponse);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async updateDeck (request, response) {
    try {
      const { id } = request.params;
      const databaseResponse = await CardsDeck.findOneAndUpdate( { id }, request.body, { new: true });
  
      response.status(200).json(databaseResponse);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async deleteDeck (request, response) {
    try {
      const { id } = request.params;
      const databaseResponse = await CardsDeck.findOneAndDelete({ id });
  
      response.status(200).json(databaseResponse);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async getCardsByDeckId () {
    try {
      const { deckId } = request.params;
      const databaseResponse = await CardsItem.find({ deckId });
  
      response.status(200).json(databaseResponse);
    } catch (error) {
      response.status(400).send(error);
    }
  }
}