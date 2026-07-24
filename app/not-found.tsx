import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <div className="max-w-xl w-full rounded-3xl border border-border bg-card p-10 shadow-xl shadow-black/5">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
            Page not found
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
            Oops! This page does not exist.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The link you followed may be broken, or the page has been moved.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Button size="lg">Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
