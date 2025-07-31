import { z } from "zod";
export const userSchema = z.object({
  id: z.number(),
  first_name: z.string().min(1, "は必須です").max(20, "は20以下です"),
  last_name: z.string().min(1, "は必須です").max(20, "は20以下です"),
  email: z.email("メールアドレスの形式は不正です").max(40, "は40以下です").nullable(),
  gender: z.string(),
  ip_address: z.string(),
});

export type UserFormValues = z.infer<typeof userSchema>;
