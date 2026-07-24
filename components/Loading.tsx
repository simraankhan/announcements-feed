import React from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center justify-center p-5",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Spinner />
        <h1 className="text-primary">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
