"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession } from "@shared/auth";

export type LoginState = { error: string } | null;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await createSession(user.id);
  redirect("/");
}
