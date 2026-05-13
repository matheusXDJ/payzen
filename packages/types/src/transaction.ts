import { z } from "zod";

export const TransactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);
export const TransactionSourceEnum = z.enum(["WEB", "WHATSAPP", "API"]);

export const createTransactionSchema = z.object({
  type: TransactionTypeEnum,
  amount: z.number().positive(),
  description: z.string().min(1, "Description is required"),
  date: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  creditCardId: z.string().optional().nullable(),
  recurringBillId: z.string().optional().nullable(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = createTransactionSchema.partial();
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
