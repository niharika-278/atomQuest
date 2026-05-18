import prisma from '../db/prisma';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateAccessToken, generateRefreshToken, JWTPayload } from '../utils/jwt';
import logger from '../utils/logger';
import { UserRole } from '@prisma/client';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.is_active) {
    logger.warn(`Login attempt with invalid email: ${email}`);
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await comparePassword(password, user.password_hash);
  if (!passwordMatch) {
    logger.warn(`Failed login attempt for user: ${email}`);
    throw new Error('Invalid email or password');
  }

  const jwtPayload: JWTPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    department_id: user.department_id || undefined,
    manager_id: user.manager_id || undefined
  };

  const access_token = generateAccessToken(jwtPayload);
  const refresh_token = generateRefreshToken({ sub: user.id });

  logger.info(`User logged in: ${email}`);

  return {
    access_token,
    refresh_token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
}

export async function createUser(
  email: string,
  name: string,
  password: string,
  role: UserRole = 'EMPLOYEE',
  manager_id?: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const password_hash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, name, password_hash, role, manager_id }
  });

  logger.info(`New user created: ${email}`);
  return user;
}

export async function refreshAccessToken(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  const jwtPayload: JWTPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    department_id: user.department_id || undefined,
    manager_id: user.manager_id || undefined
  };

  return generateAccessToken(jwtPayload);
}
