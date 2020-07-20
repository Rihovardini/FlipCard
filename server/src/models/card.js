import mongoose from 'mongoose';

const cardsItemSchema = mongoose.Schema({
  id: String,
  deckId: String,
  term: String,
  definition: String
});

export const CardsItem = mongoose.model('CardsItem', cardsItemSchema); 
