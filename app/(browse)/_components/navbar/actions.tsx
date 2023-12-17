import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard, LogOut } from "lucide-react";

interface ActionsProps {
  isInDashboardView: boolean;
}

export const Actions = async ({ isInDashboardView }: ActionsProps) => {
  if (isInDashboardView) {
    return (
      <div className="flex items-center justify-end gap-x-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href="/">
            <LogOut className="h-5 w-5 mr-2" />
            Exit
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  } else {
    const user = await currentUser();
    return (
      <div className="flex items-center justify-end gap-x-2 ml-4">
        {!user && (
          <SignInButton>
            <Button size="sm" variant="primary">
              Login
            </Button>
          </SignInButton>
        )}
        {!!user && (
          <div className="flex items-center gap-x-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary transition"
              asChild
            >
              <Link href={`/u/${user.username}`}>
                <Clapperboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    );
  }
};
