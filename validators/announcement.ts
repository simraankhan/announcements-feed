import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),

  imageUrl: z.string().trim().min(1, "Image is required"),
  createdUserId: z.string().trim().min(1, "Created user is required"),
});

export type CreateAnnouncementDto = z.infer<typeof createAnnouncementSchema>;
