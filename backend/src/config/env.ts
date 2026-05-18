import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

export const config = {
  node_env: process.env.NODE_ENV as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT || '3001', 10),

  database_url: process.env.DATABASE_URL!,
  redis_url: process.env.REDIS_URL || 'redis://localhost:6379',

  jwt_secret: process.env.JWT_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_expiry: parseInt(process.env.JWT_EXPIRY || '900', 10),
  jwt_refresh_expiry: parseInt(process.env.JWT_REFRESH_EXPIRY || '604800', 10),

  demo_mode: process.env.DEMO_MODE === 'true',
  sendgrid_api_key: process.env.SENDGRID_API_KEY || '',
  sendgrid_from_email: process.env.SENDGRID_FROM_EMAIL || 'noreply@goalportal.com',

  log_level: process.env.LOG_LEVEL || 'info'
};

export default config;
