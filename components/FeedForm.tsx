"use client";

import { Controller, useForm } from "react-hook-form";
import FeedModel from "@/models/FeedModel";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import FileUpload from "./FileUpload";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { DialogRootActions } from "@base-ui/react";
import { createAnnouncementAction } from "@/actions/announcement.action";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const FeedForm = () => {
  const form = useForm<z.infer<typeof FeedModel.feedFormSchema>>({
    resolver: zodResolver(FeedModel.feedFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const actionsRef = useRef<DialogRootActions>(null);

  const router = useRouter();

  const { user } = useUser();

  const onSubmit = async (
    formValues: z.infer<typeof FeedModel.feedFormSchema>,
  ) => {
    setLoading(true);
    try {
      const res = await createAnnouncementAction({
        ...formValues,
        createdUserId: user?.id,
      });

      if (res.success) {
        toast.success("Announcement created successfully");
        form.reset();
        actionsRef.current?.close();
        actionsRef.current?.unmount();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error((error as any)?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Dialog disablePointerDismissal actionsRef={actionsRef}>
      <DialogTrigger
        render={
          <Button>
            <Plus /> Add new Feedback
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Announcement Feedback</DialogTitle>
          <DialogDescription>
            Share your announcements with your team
          </DialogDescription>
        </DialogHeader>
        <form id="form-feedback" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-4 w-full">
            {FeedModel.FeedFormFields(form)}
            <Controller
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Photo</FieldLabel>
                  <FileUpload
                    hookForm={form}
                    id={field.name}
                    accept="image/*"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="form-feedback" disabled={loading}>
              {loading ? <Spinner /> : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
              disabled={loading}
            >
              Reset
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedForm;
