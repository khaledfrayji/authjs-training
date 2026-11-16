// lib/validation.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim()
    .min(2, "Use at least 2 characters.")
    .max(40, "Use at most 40 characters.") 
    .regex(/^[a-zA-Z0-9_]+$/, "Use only letters, numbers, and underscores."),
});