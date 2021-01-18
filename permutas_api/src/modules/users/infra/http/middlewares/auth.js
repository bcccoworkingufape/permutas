import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../../../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // const [bearer, Token] = authHeader.split('');
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    return res.json({ error: 'Token malformatted' });
  }

  // return next();
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
