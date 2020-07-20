import jwt from 'jsonwebtoken';

export const tokenVerification = async (request, response, next) => {
  const token = request.get('Authorization');

  if (!token) response.status(401).send('Token is invalid');

  const accessToken = token.split(' ')[1];

  try {
    await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);

    next();
  } catch (error) {
    response.status(401).send(error);
  }
}