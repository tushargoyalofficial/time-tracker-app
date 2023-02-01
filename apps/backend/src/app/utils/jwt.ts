import jwt, { SignOptions } from 'jsonwebtoken';

export const signJwt = (payload: object, options: SignOptions = {}) => {
  const pvtKey = `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`;

  const privateKey = Buffer.from(pvtKey, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  const pubKey = `${process.env.ACCESS_TOKEN_PUBLIC_KEY}`;

  try {
    const publicKey = Buffer.from(pubKey, 'base64').toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
