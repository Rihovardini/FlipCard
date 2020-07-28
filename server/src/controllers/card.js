import shortid from 'shortid';

import { CardsItem } from '../models/card';

export class CardController {
  static async getCard (request, response) {
    try {
      const { id } = request.params;
      const dbAnswer = await CardsItem.find({ id });
    
      response.status(200).json(dbAnswer);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async createCard (request, response) {
    try {
      const { term, definition, deckId } = request.body;
      const dbAnswer = await new CardsItem({ term, definition, deckId, id: shortid() }).save();
    
      response.status(201).json(dbAnswer);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async createCards (request, response) {
    try {
      const { cards } = request.body;
      const savedCards = [];

      for (const card of cards) {
        const savedCard = await new CardsItem({ ...card,  id: shortid() }).save();
        savedCards.push(savedCard);
      }

      response.status(201).json(savedCards);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async updateCard (request, response) {
    try {
      const { id } = request.body;
      const dbAnswer = await CardsItem.findOneAndUpdate({ id }, request.body, { new: true });
    
      response.status(200).json(dbAnswer);
    } catch (error) {
      response.status(400).send(error);
    }
  }

  static async deleteCard (request, response) {
    try {
      const { id } = request.params;
      const dbAnswer = await CardsItem.findOneAndDelete({ id });
    
      response.status(200).json(dbAnswer);
    } catch (error) {
      response.status(400).send(error);
    }
  }
}