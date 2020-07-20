import mongoose from 'mongoose';

const cardsDeckSchema = mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  description: String
});

export const CardsDeck = mongoose.model('CardsDeck', cardsDeckSchema); 