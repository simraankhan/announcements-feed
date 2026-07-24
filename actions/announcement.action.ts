"use server";

import { announcementAllCacheKey } from "@/constants/constants";
import {
  createAnnouncement,
  getAllAnnouncements,
} from "@/services/announcement.service";
import { createAnnouncementSchema } from "@/validators/announcement";
import { revalidateTag } from "next/cache";
import z from "zod";

export async function createAnnouncementAction(body: unknown) {
  const validation = createAnnouncementSchema.safeParse(body);

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  const data = await createAnnouncement(validation.data);

  revalidateTag(announcementAllCacheKey, "max");

  return {
    success: true,
    data,
  };
}

export async function getAllAnnouncementsAction() {
  return await getAllAnnouncements();
}
