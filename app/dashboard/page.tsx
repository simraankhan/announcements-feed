import FeedForm from "@/components/FeedForm";
import Feeds from "@/components/Feeds";
import Toolbar from "@/components/Toolbar";

const DashboardPage = () => {
  return (
    <>
      <Toolbar />
      <div className="container flex flex-col gap-10">
        <div className="mt-10 flex justify-start sm:justify-end">
          <FeedForm />
        </div>
        <h1 className="text-primary max-w-prose">
          This is an internal announcements portal. It lets users create
          announcement posts with a title, description, and image, then displays
          those announcements in a dashboard feed.
        </h1>
        <Feeds />
      </div>
    </>
  );
};

export default DashboardPage;
