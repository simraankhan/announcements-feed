import { SignUp } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/auth/clerk-appearance";
import {
  clerkSignInUrl,
  clerkSignUpFallbackRedirectUrl,
  clerkSignUpUrl,
} from "@/lib/auth/clerk-routes";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function SignUpPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignUp
        appearance={clerkAppearance}
        routing="path"
        path={clerkSignUpUrl}
        signInUrl={clerkSignInUrl}
        fallbackRedirectUrl={clerkSignUpFallbackRedirectUrl}
      />
    </Suspense>
  );
}
