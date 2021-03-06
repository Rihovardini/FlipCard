import express from 'express';

import { DeckController } from '../controllers/deck';
import { tokenVerification } from '../middleware/token-verification';

export const cardsDeckRoutes = express.Router();

cardsDeckRoutes.get('/:id', tokenVerification, DeckController.getDeckById);

cardsDeckRoutes.get('/student/:studentId', tokenVerification, DeckController.getDeckByUserId);

cardsDeckRoutes.post('/', tokenVerification, DeckController.createDeck);

cardsDeckRoutes.put('/', tokenVerification, DeckController.updateDeck);

cardsDeckRoutes.delete('/:id', tokenVerification, DeckController.deleteDeck);

cardsDeckRoutes.get('/:deckId/cards', tokenVerification, DeckController.getCardsByDeckId);
