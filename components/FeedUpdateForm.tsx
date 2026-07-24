"use client";

import { Controller, useForm } from "react-hook-form";
import FeedModel, { IFeed } from "@/models/FeedModel";
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
import { Edit } from "lucide-react";
import FileUpload from "./FileUpload";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { DialogRootActions } from "@base-ui/react";
import { updateAnnouncementAction } from "@/actions/announcement.action";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { updateAnnouncement } from "@/services/announcement.service";

interface Props {
  feed: IFeed;
}

const FeedUpdateForm = ({ feed }: Props) => {
  // Hooks
  const form = useForm<z.infer<typeof FeedModel.feedFormSchema>>({
    resolver: zodResolver(FeedModel.feedFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });
  const actionsRef = useRef<DialogRootActions>(null);

  const router = useRouter();

  const { user } = useUser();

  // States
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(() => {
    if (!feed) return;

    form.reset({
      title: feed.title,
      description: feed.description,
      imageUrl: feed.imageUrl,
    });
  }, [feed]);

  // Functions
  const onSubmit = async (
    formValues: z.infer<typeof FeedModel.feedFormSchema>,
  ) => {
    setLoading(true);
    try {
      const res = await updateAnnouncementAction(feed.id, formValues);

      if (res.success) {
        toast.success("Announcement updated successfully");
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

  if (feed?.createdUserId !== user?.id) {
    return null;
  }

  return (
    <Dialog disablePointerDismissal actionsRef={actionsRef}>
      <DialogTrigger
        render={
          <Button variant={"link"} className={"no-underline!"}>
            <Edit />
            Update
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Announcement</DialogTitle>
          <DialogDescription>
            Update {feed.title} announcement
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
                    image={feed.imageUrl}
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

export default FeedUpdateForm;
