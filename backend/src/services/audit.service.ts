import prisma from '../db/prisma';
import { AuditAction } from '@prisma/client';
import logger from '../utils/logger';

export interface AuditLogInput {
  entity_type: string;
  entity_id: string;
  action: AuditAction;
  changed_by: string;
  previous_value?: unknown;
  new_value?: unknown;
  ip_address?: string;
}

export async function logAuditEvent(input: AuditLogInput) {
  const auditLog = await prisma.auditLog.create({
    data: {
      entity_type: input.entity_type,
      entity_id: input.entity_id,
      action: input.action,
      changed_by: input.changed_by,
      previous_value: input.previous_value ? JSON.stringify(input.previous_value) : null,
      new_value: input.new_value ? JSON.stringify(input.new_value) : null,
      ip_address: input.ip_address
    }
  });

  logger.info(`Audit logged: ${input.entity_type} ${input.entity_id} - ${input.action}`);
  return auditLog;
}

export async function getAuditLogs(
  entityType?: string,
  entityId?: string,
  limit: number = 100
) {
  return prisma.auditLog.findMany({
    where: {
      ...(entityType && { entity_type: entityType }),
      ...(entityId && { entity_id: entityId })
    },
    include: {
      user: { select: { id: true, email: true, name: true } }
    },
    orderBy: { timestamp: 'desc' },
    take: limit
  });
}
