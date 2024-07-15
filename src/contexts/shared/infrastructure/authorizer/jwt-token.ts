import jwt from 'jsonwebtoken';
import { Payload, TokenScope } from '../../domain/interface/payload';

export const JWTSign = (
  payload: Payload,
  secret: string,
  options: jwt.SignOptions,
  refreshOptions: jwt.SignOptions
): {
  accessToken: string;
  refreshToken: string;
} => {
  const refreshPayload: Payload = { ...payload, scopes: [TokenScope.REFRESH] };
  return {
    accessToken: jwt.sign(payload, secret, options),
    refreshToken: jwt.sign(refreshPayload, secret, refreshOptions)
  };
};
