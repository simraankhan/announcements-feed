import type { ReactNode } from "react";
import { Lock, Sparkle, Users } from "lucide-react";

const authHighlights = [
  {
    title: "Secure",
    description:
      "Authenticated employees can log in and access company announcements.",
    icon: Lock,
  },
  {
    title: "Collaborative",
    description:
      "Collaborate with other employees to create and share announcements.",
    icon: Users,
  },
  {
    title: "Efficient",
    description:
      "Efficiently manage announcements and keep your team up-to-date.",
    icon: Sparkle,
  },
];

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-dvh">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
        <section className="hidden border-r px-10 py-9 lg:flex lg:flex-col">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-muted-foreground">
                AF
              </div>
              <p className="text-lg font-semibold tracking-normal text-primary">
                Announcements Feed
              </p>
            </div>

            <div className="mt-36 max-w-lg">
              <h1 className="text-4xl font-semibold leading-tight tracking-normal">
                Systems for your team to share announcements
              </h1>
              <p className="mt-8 max-w-md text-xl leading-8 text-muted-foreground">
                A secure portal where authenticated employees can log in and
                access company announcements
              </p>
            </div>
          </div>

          <ul className="mt-20 max-w-2xl space-y-8">
            {authHighlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <li key={highlight.title} className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="pt-1">
                    <h2 className="text-lg font-semibold tracking-normal">
                      {highlight.title}
                    </h2>
                    <p className="mt-1 text-base leading-6 text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6">
          {children}
        </section>
      </div>
    </main>
  );
}
