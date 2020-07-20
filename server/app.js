import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import morgan from 'morgan';

import { cardsDeckRoutes } from './src/routes/decks';
import { cardsItemRoutes } from './src/routes/cards';
import { usersRouter } from './src/routes/users';

export const app = express();
mongoose
  .connect
    (`mongodb+srv://rihovardini:${process.env.DB_PASSWORD}@cluster0-obuzb.mongodb.net/flipcard?retryWrites=true&w=majority`,
    { useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch(() => console.warn('Diss'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/deck', cardsDeckRoutes);
app.use('/card', cardsItemRoutes);
app.use('/auth', usersRouter);