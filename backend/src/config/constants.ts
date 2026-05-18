export const VALIDATION_RULES = {
  GOAL_WEIGHTAGE_MIN: 10,
  GOAL_WEIGHTAGE_MAX: 100,
  GOAL_WEIGHTAGE_SUM: 100,
  MAX_GOALS_PER_EMPLOYEE: 8,
  PASSWORD_MIN_LENGTH: 8,
  RATE_LIMIT_LOGIN: '10/min',
  RATE_LIMIT_API: '100/min'
};

export const CHECK_IN_WINDOWS = {
  Q1: { opens: '2024-07-01', closes: '2024-07-31' },
  Q2: { opens: '2024-10-01', closes: '2024-10-31' },
  Q3: { opens: '2025-01-01', closes: '2025-01-31' },
  Q4: { opens: '2025-04-01', closes: '2025-04-30' }
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized - Invalid or missing token',
  FORBIDDEN: 'Forbidden - Access denied',
  GOAL_LOCKED: 'Goal is locked. Contact admin to unlock.',
  INVALID_WEIGHTAGE: 'Weightage must sum to 100%',
  MAX_GOALS_EXCEEDED: 'Maximum 8 goals allowed per employee',
  GOAL_NOT_FOUND: 'Goal not found',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists'
};
