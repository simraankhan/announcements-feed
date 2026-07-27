import { getAllAnnouncementsAction } from "@/actions/announcement.action";
import FeedItem from "./FeedItem";

const Feeds = async () => {
  const feeds = await getAllAnnouncementsAction();

  if (!feeds || feeds.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-lg text-center">No feeds yet</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 pb-20">
      {feeds.map((feed) => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </div>
  );
};

export default Feeds;
