import FeedForm from "@/components/FeedForm";
import Feeds from "@/components/Feeds";
import Toolbar from "@/components/Toolbar";

const DashboardPage = () => {
  return (
    <>
      <Toolbar />
      <div className="container flex flex-col gap-10">
        <div className="mt-10 flex justify-end">
          <FeedForm />
        </div>
        <Feeds />
      </div>
    </>
  );
};

export default DashboardPage;
