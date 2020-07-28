import express from 'express';

import { CardController } from '../controllers/card';
import { tokenVerification } from '../middleware/token-verification';

export const cardsItemRoutes = express.Router();

cardsItemRoutes.get('/:id', CardController.getCard);

cardsItemRoutes.post('/', tokenVerification, CardController.createCard);

cardsItemRoutes.put('/', tokenVerification, CardController.updateCard);

cardsItemRoutes.delete('/:id', tokenVerification, CardController.deleteCard);