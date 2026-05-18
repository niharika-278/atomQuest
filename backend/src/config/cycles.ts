import { CyclePhase } from '@prisma/client';

export interface CycleWindow {
  year: number;
  phase: CyclePhase;
  window_opens: Date;
  window_closes: Date;
}

export const DEFAULT_CYCLES_2024: CycleWindow[] = [
  {
    year: 2024,
    phase: 'goal_setting',
    window_opens: new Date('2024-05-01'),
    window_closes: new Date('2024-05-31')
  },
  {
    year: 2024,
    phase: 'q1_checkin',
    window_opens: new Date('2024-07-01'),
    window_closes: new Date('2024-07-31')
  },
  {
    year: 2024,
    phase: 'q2_checkin',
    window_opens: new Date('2024-10-01'),
    window_closes: new Date('2024-10-31')
  },
  {
    year: 2024,
    phase: 'q3_checkin',
    window_opens: new Date('2025-01-01'),
    window_closes: new Date('2025-01-31')
  },
  {
    year: 2024,
    phase: 'q4_final',
    window_opens: new Date('2025-04-01'),
    window_closes: new Date('2025-04-30')
  }
];
