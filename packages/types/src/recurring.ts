import { z } from "zod";

export const RecurringFrequencyEnum = z.enum(["MONTHLY", "WEEKLY", "YEARLY"]);

export const createRecurringBillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be positive"),
  frequency: RecurringFrequencyEnum,
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
});

export type CreateRecurringBillInput = z.infer<typeof createRecurringBillSchema>;

export const updateRecurringBillSchema = createRecurringBillSchema.partial();
export type UpdateRecurringBillInput = z.infer<typeof updateRecurringBillSchema>;
