import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface IFeed {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  createdUserId: string;
}

const feedFormSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  description: z
    .string()
    .min(1, { error: "Description is required" })
    .max(500, { error: "Description must be less than 500 characters" }),
  imageUrl: z.string().min(1, { error: "Image is required" }),
});

const FeedFormFields = (
  form: ReturnType<typeof useForm<z.infer<typeof feedFormSchema>>>,
) => (
  <>
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Title</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Enter a title"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="description"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Description</FieldLabel>
          <Textarea
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder="Enter a description"
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </>
);

export default {
  feedFormSchema,
  FeedFormFields,
};
