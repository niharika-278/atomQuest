import winston from 'winston';
import { config } from '../config/env';

const logger = winston.createLogger({
  level: config.log_level,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'goal-portal-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

if (config.node_env === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    })
  );
  logger.add(
    new winston.transports.File({
      filename: 'combined.log'
    })
  );
}

export default logger;
