import { SignIn } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/auth/clerk-appearance";
import {
  clerkSignInFallbackRedirectUrl,
  clerkSignInUrl,
  clerkSignUpUrl,
} from "@/lib/auth/clerk-routes";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function SignInPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignIn
        appearance={clerkAppearance}
        routing="path"
        path={clerkSignInUrl}
        signUpUrl={clerkSignUpUrl}
        fallbackRedirectUrl={clerkSignInFallbackRedirectUrl}
      />
    </Suspense>
  );
}
