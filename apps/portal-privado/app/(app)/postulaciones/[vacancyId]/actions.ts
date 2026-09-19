"use server";

import { revalidatePath } from "next/cache";
import { updateApplicationStatus } from "@shared/candidates";

export async function setApplicationStatusAction(id: string, vacancyId: string, status: string) {
  await updateApplicationStatus(id, status);
  revalidatePath(`/postulaciones/${vacancyId}`);
}
