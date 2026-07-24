import Home from "@/components/Home";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
