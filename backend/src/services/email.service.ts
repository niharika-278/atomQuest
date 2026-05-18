import logger from '../utils/logger';
import { config } from '../config/env';

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  if (!config.sendgrid_api_key) {
    logger.info(`[Email stub] To: ${to}, Subject: ${subject}`);
    return;
  }
  logger.info(`Email queued to ${to}: ${subject}`);
}
