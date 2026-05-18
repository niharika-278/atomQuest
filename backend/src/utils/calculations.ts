import { UoMType } from '@prisma/client';

export function calculateProgressScore(
  actual: number | null | undefined,
  target: number,
  uomType: UoMType
): number {
  if (actual === null || actual === undefined || target === 0) {
    return 0;
  }

  let score: number;

  switch (uomType) {
    case 'MIN':
      score = (actual / target) * 100;
      break;
    case 'MAX':
      score = (target / actual) * 100;
      break;
    case 'TIMELINE':
      score = actual <= target ? 100 : 0;
      break;
    case 'ZERO':
      score = actual === 0 ? 100 : 0;
      break;
    default:
      score = 0;
  }

  return Math.min(Math.max(score, 0), 100);
}

export function validateWeightages(
  weightages: number[],
  maxGoals: number = 8,
  minWeightage: number = 10
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (weightages.length > maxGoals) {
    errors.push(`Maximum ${maxGoals} goals allowed`);
  }

  const sum = weightages.reduce((acc, w) => acc + w, 0);
  if (sum !== 100) {
    errors.push(`Weightages must sum to 100% (current: ${sum}%)`);
  }

  if (weightages.some((w) => w < minWeightage)) {
    errors.push(`Minimum weightage per goal: ${minWeightage}%`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
