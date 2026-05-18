import { calculateProgressScore, validateWeightages } from './calculations';
import { UoMType } from '@prisma/client';

describe('Progress Score Calculation', () => {
  describe('MIN type (higher is better)', () => {
    it('should calculate correctly when actual exceeds target', () => {
      const score = calculateProgressScore(600, 500, 'MIN' as UoMType);
      expect(score).toBe(100);
    });

    it('should calculate correctly when actual equals target', () => {
      const score = calculateProgressScore(500, 500, 'MIN' as UoMType);
      expect(score).toBe(100);
    });

    it('should calculate correctly when actual is less than target', () => {
      const score = calculateProgressScore(250, 500, 'MIN' as UoMType);
      expect(score).toBe(50);
    });
  });

  describe('MAX type (lower is better)', () => {
    it('should calculate correctly when actual is less than target', () => {
      const score = calculateProgressScore(10, 20, 'MAX' as UoMType);
      expect(score).toBe(100);
    });

    it('should handle target = 0 gracefully', () => {
      const score = calculateProgressScore(10, 0, 'MAX' as UoMType);
      expect(score).toBe(0);
    });
  });

  describe('ZERO type', () => {
    it('should return 100 when actual = 0', () => {
      const score = calculateProgressScore(0, 100, 'ZERO' as UoMType);
      expect(score).toBe(100);
    });

    it('should return 0 when actual != 0', () => {
      const score = calculateProgressScore(5, 100, 'ZERO' as UoMType);
      expect(score).toBe(0);
    });
  });

  describe('null/undefined handling', () => {
    it('should return 0 when actual is null', () => {
      const score = calculateProgressScore(null, 100, 'MIN' as UoMType);
      expect(score).toBe(0);
    });
  });
});

describe('Weightage Validation', () => {
  it('should pass when weightages sum to 100%', () => {
    const result = validateWeightages([40, 30, 20, 10]);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fail when weightages do not sum to 100%', () => {
    const result = validateWeightages([40, 30, 20]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('sum to 100%'))).toBe(true);
  });
});
