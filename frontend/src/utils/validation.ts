import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const goalSchema = z.object({
  thrust_area: z.enum(['STRATEGIC', 'OPERATIONAL', 'TALENT', 'QUALITY', 'INNOVATION']),
  title: z.string().min(3, 'Title is required'),
  description: z.string().optional(),
  uom_type: z.enum(['MIN', 'MAX', 'TIMELINE', 'ZERO']),
  target_value: z.number().positive('Target must be positive'),
  weightage: z.number().min(10).max(100)
});

export const achievementSchema = z.object({
  goal_id: z.string().min(1),
  quarter_code: z.string().min(1),
  actual_value: z.number(),
  status: z.enum(['not_started', 'on_track', 'completed'])
});
