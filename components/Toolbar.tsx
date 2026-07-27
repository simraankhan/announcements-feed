import { clerkAppearance } from "@/lib/auth/clerk-appearance";
import { UserButton } from "@clerk/nextjs";

const Toolbar = () => {
  return (
    <div className="w-full bg-secondary px-4 py-2 flex items-center">
      <div className="flex-1">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          AF
        </div>
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
