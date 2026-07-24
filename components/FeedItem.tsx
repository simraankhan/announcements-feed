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
          <img src={feed.imageUrl} alt={feed.title} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
