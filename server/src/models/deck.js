import mongoose from 'mongoose';

const cardsDeckSchema = mongoose.Schema({
  id: String,
  studentId: String,
  name: String,
  description: String
});

export const CardsDeck = mongoose.model('CardsDeck', cardsDeckSchema); 