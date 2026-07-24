import Home from "@/components/Home";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense fallback={<Loading className="h-screen! w-screen!" />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
