import { clerkAppearance } from "@/lib/auth/clerk-appearance";
import { UserButton } from "@clerk/nextjs";

const Toolbar = () => {
  return (
    <div className="w-full bg-secondary px-4 py-2 flex items-center">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-muted-foreground">
          Announcements
        </h1>
      </div>
      <UserButton
        appearance={clerkAppearance}
        userProfileMode="modal"
        userProfileProps={{ appearance: clerkAppearance }}
      />
    </div>
  );
};

export default Toolbar;
