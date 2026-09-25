"use client";
import React from "react";
import {
  OrganizationSwitcher,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

function AuthHeader() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <>
      {!isLoaded ? (
        <Skeleton className="bg-gray-400 w-6 h-6 animate-pulse"/>
      ) : !isSignedIn ? (
         <SignInButton mode="modal">
                <Button size="sm" variant="ghost" className="cursor-pointer">Sign in</Button>
              </SignInButton>
      ) : (
        <>
          {" "}
          <div className="hidden md:block">
            <OrganizationSwitcher
              afterLeaveOrganizationUrl="/"
              afterSelectOrganizationUrl="/"
              afterSelectPersonalUrl="/"
              afterCreateOrganizationUrl="/"
            />
          </div>
        </>
      )}

      <UserButton />
    </>
  );
}

export default React.memo(AuthHeader);
