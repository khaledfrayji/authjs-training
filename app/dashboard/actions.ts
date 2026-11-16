// app/dashboard/actions.ts
"use server";

import { auth } from "@/auth";
import { profileSchema } from "@/lib/validation";

export async function previewName(name: unknown) {
  const session = await auth();
  if (!session.user) return "Please sign in first.";

  const result = profileSchema.safeParse(name);
  if (!result.success) return result.error.issues[0].message;

  // Learning demo: return a preview; no database write.
  return "Preview: " + result.data.name;
}