import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

import React from "react";

export default function page() {
  return (
    <div>
      {" "}
      <header className="flex h-16 items-center justify-end gap-4 p-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="text-ceramic-white h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}
