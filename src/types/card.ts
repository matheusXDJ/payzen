import { z } from "zod";

export const createCardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  limit: z.number().positive("Limit must be positive"),
  closingDay: z.number().min(1).max(31, "Invalid day"),
  dueDay: z.number().min(1).max(31, "Invalid day"),
  color: z.string().min(1).default("#1e293b"),
});

export type CreateCardInput = z.infer<typeof createCardSchema>;

export const updateCardSchema = createCardSchema.partial();
export type UpdateCardInput = z.infer<typeof updateCardSchema>;
