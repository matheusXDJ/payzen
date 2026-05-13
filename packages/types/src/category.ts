import { z } from "zod";
import { TransactionTypeEnum } from "./transaction";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().min(1, "Icon is required").default("📁"),
  color: z.string().min(1, "Color is required").default("#6366f1"),
  type: TransactionTypeEnum,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
