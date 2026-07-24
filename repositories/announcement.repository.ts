import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export class AnnouncementRepository {
  static async createAnnouncement(payload: Prisma.AnnouncementCreateInput) {
    return await prisma.announcement.create({ data: payload });
  }

  static async getAllAnnouncements() {
    return await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getAnnouncementById(id: string) {
    return await prisma.announcement.findUnique({ where: { id } });
  }

  static async updateAnnoncement(
    id: string,
    payload: Prisma.AnnouncementUpdateInput,
  ) {
    return await prisma.announcement.update({ where: { id }, data: payload });
  }
}
