import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: String,
  firstName: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    required: true,
    type: String,
    min: 8,
    max: 255
  },
  tokens: {
    type: Array
  }
});

export const User = mongoose.model('User', userSchema);