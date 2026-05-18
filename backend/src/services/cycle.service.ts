import prisma from '../db/prisma';
import { CyclePhase } from '@prisma/client';

export async function getActiveCycle() {
  return prisma.cycle.findFirst({ where: { is_active: true } });
}

export async function getAllCycles() {
  return prisma.cycle.findMany({ orderBy: [{ year: 'desc' }, { phase: 'asc' }] });
}

export async function createCycle(data: {
  year: number;
  phase: CyclePhase;
  window_opens: Date;
  window_closes: Date;
  created_by: string;
}) {
  return prisma.cycle.create({ data: { ...data, is_active: false } });
}

export async function activateCycle(cycleId: string) {
  await prisma.cycle.updateMany({ data: { is_active: false } });
  return prisma.cycle.update({
    where: { id: cycleId },
    data: { is_active: true }
  });
}
