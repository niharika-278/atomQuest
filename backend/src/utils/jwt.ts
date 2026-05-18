import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  department_id?: string;
  manager_id?: string;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwt_expiry
  });
}

export function generateRefreshToken(payload: Pick<JWTPayload, 'sub'>): string {
  return jwt.sign(payload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expiry
  });
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt_secret) as JWTPayload;
}

export function verifyRefreshToken(token: string): Pick<JWTPayload, 'sub'> {
  return jwt.verify(token, config.jwt_refresh_secret) as Pick<JWTPayload, 'sub'>;
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
