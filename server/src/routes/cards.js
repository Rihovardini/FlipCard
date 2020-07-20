import express from 'express';

import { CardController } from '../controllers/card';
import { tokenVerification } from '../middleware/token-verification';

export const cardsItemRoutes = express.Router();

cardsItemRoutes.get('/:id', CardController.getCard);

cardsItemRoutes.post('/', tokenVerification, CardController.createCard);

cardsItemRoutes.post('/', tokenVerification, CardController.createCards);

cardsItemRoutes.put('/:id', tokenVerification, CardController.updateCard);

cardsItemRoutes.delete('/:id', tokenVerification, CardController.deleteCard);