"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@shared/auth";

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
