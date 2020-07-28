import bcrypt from 'bcrypt';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { tokenGenerator } from '../helpers/jwt-generator';

export class UserController {
  static async singUp (request, response) {
    try {
      const { firstName, lastName, email, password } = request.body;
      const id = shortid();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const accessToken = tokenGenerator({ email, id, firstName, lastName }, process.env.ACCESS_SECRET_KEY, '1h');
      const refreshToken = tokenGenerator({ email, id }, process.env.REFRESH_SECRET_KEY, '48h');
    
      await new User({ id, firstName, lastName, email, password: hashedPassword, tokens: [refreshToken] }).save();
  
      response.status(201).json({
        message: 'Sign up completed successfully.',
        accessToken,
        refreshToken
      });
  
    } catch (error) {
      response.status(401).send(error);
    }
  }

  static async logIn (request, response) {
    try {
      const { email, password } = request.body;
      const [ user ] = await User.find({ email });
  
      if (user === undefined) return response.status(400).json({ message: 'Authentication failed.' });

      const isPasswordsEqual = bcrypt.compareSync(password, user.password);
  
      if (isPasswordsEqual === false) return response.status(400).json({ message: 'Authentication failed.' });

      const { firstName, lastName, id } = user; 
      const accessToken = tokenGenerator({ email, id, firstName, lastName }, process.env.ACCESS_SECRET_KEY, '1h');
      const refreshToken = tokenGenerator({ email, id }, process.env.REFRESH_SECRET_KEY, '48h');

      console.log(id, 'at');
  
      if (user.tokens.length >= 5) {
        user.tokens = [refreshToken];
      } else {
        user.tokens.push(refreshToken);
      }
  
      await User.findOneAndUpdate({ email }, user, { new: true });
  
      response.status(200).json({
        message: 'Authentication success.',
        accessToken,
        refreshToken
      });
  
    } catch (error) {
      response.status(401).json({
        message: 'no'
      });
    }
  }

  static async refreshToken(request, response) {
    try {
      const { refreshToken: token } = request.body;
      const { email, id } = await jwt.verify(token, process.env.REFRESH_SECRET_KEY);
  
      const [ user ] = await User.find({ email });

      const { firstName, lastName } = user; 
      
      const accessToken = tokenGenerator({ email, id, firstName, lastName }, process.env.ACCESS_SECRET_KEY, '1h');
      const refreshToken = tokenGenerator({ email, id }, process.env.REFRESH_SECRET_KEY, '48h');
      
      user.tokens = use.tokens.map((item) => {
        if(item === token) return refreshToken;
  
        return item;
      });
  
      await User.findOneAndUpdate({ email }, user, { new: true });
  
      response.status(200).json({
        message: 'Refresh token success.',
        accessToken,
        refreshToken
      });
    } catch (error) {
      response.status(403).json({ message: 'Refresh token failed.' });
    }
  }
}