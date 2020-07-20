import jwt from 'jsonwebtoken';

export const tokenGenerator = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn });
}