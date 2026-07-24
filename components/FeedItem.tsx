import { IFeed } from "@/models/FeedModel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import FeedUpdateForm from "./FeedUpdateForm";
import DeleteFeed from "./DeleteFeed";
import Image from "next/image";

interface Props {
  feed: IFeed;
}

const FeedItem = ({ feed }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-primary font-semibold">
          {feed.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-3">
          {feed.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground text-[12px]">
              Posted on {new Date(feed.createdAt).toDateString()}
            </span>
          </div>
          <Image
            src={feed.imageUrl}
            alt={feed.title}
            className="w-full h-75 object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <FeedUpdateForm feed={feed} />
        <DeleteFeed feed={feed} />
      </CardFooter>
    </Card>
  );
};

export default FeedItem;
