import FeedForm from "@/components/FeedForm";
import Feeds from "@/components/Feeds";
import Toolbar from "@/components/Toolbar";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <>
      <Toolbar />
      <div className="container flex flex-col gap-10">
        <div className="mt-10 flex justify-end">
          <FeedForm />
        </div>
        <h1 className="text-primary max-w-prose">
          This is an internal announcements portal. It lets users create
          announcement posts with a title, description, and image, then displays
          those announcements in a dashboard feed.
        </h1>
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-5 w-full">
              <Spinner />
            </div>
          }
        >
          <Feeds />
        </Suspense>
      </div>
    </>
  );
};

export default DashboardPage;
