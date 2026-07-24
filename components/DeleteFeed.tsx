"use client";

import { IFeed } from "@/models/FeedModel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { deleteAnnouncementAction } from "@/actions/announcement.action";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DialogRootActions } from "@base-ui/react";
import { Spinner } from "./ui/spinner";

interface Props {
  feed: IFeed;
}

const DeleteFeed = ({ feed }: Props) => {
  // Hooks
  const { user } = useUser();

  const router = useRouter();

  const actionsRef = useRef<DialogRootActions>(null);

  // States
  const [loading, setLoading] = useState(false);

  // Functions
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAnnouncementAction(feed.id);
      toast.success("Announcement deleted successfully");
      actionsRef.current?.close();
      actionsRef.current?.unmount();
      router.refresh();
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
    <Dialog actionsRef={actionsRef}>
      <DialogTrigger
        render={
          <Button variant={"link"} className="text-destructive no-underline!">
            {" "}
            <X /> Delete
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this feed?</DialogTitle>
        </DialogHeader>
        <DialogFooter showCloseButton={false}>
          <DialogClose
            render={
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            }
          />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFeed;
