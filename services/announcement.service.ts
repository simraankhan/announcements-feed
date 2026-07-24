import { announcementAllCacheKey } from "@/constants/constants";
import { Prisma } from "@/lib/generated/prisma/client";
import { AnnouncementRepository } from "@/repositories/announcement.repository";
import { cacheLife, cacheTag } from "next/cache";

export async function getAllAnnouncements() {
  "use cache";

  cacheTag(announcementAllCacheKey);

  cacheLife({
    stale: 120,
    revalidate: 60,
    expire: 300,
  });

  return AnnouncementRepository.getAllAnnouncements();
}

export async function getAnnouncementById(id: string) {
  return AnnouncementRepository.getAnnouncementById(id);
}

export async function createAnnouncement(
  payload: Prisma.AnnouncementCreateInput,
) {
  return AnnouncementRepository.createAnnouncement(payload);
}

export async function updateAnnouncement(
  id: string,
  payload: Prisma.AnnouncementUpdateInput,
) {
  return AnnouncementRepository.updateAnnoncement(id, payload);
}
