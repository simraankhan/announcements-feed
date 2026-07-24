"use server";

import { announcementAllCacheKey } from "@/constants/constants";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
} from "@/services/announcement.service";
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from "@/validators/announcement";
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

export async function getAnnouncementByIdAction(id: string) {
  return await getAnnouncementById(id);
}

export async function updateAnnouncementAction(id: string, body: unknown) {
  const validation = updateAnnouncementSchema.safeParse(body);

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  const data = await updateAnnouncement(id, validation.data);

  revalidateTag(announcementAllCacheKey, "max");

  return {
    success: true,
    data,
  };
}

export async function deleteAnnouncementAction(id: string) {
  await deleteAnnouncement(id);
  revalidateTag(announcementAllCacheKey, "max");
}
