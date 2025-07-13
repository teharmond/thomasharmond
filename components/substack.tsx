import React from "react";

export default function Substack() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-14 px-2 border p-4 pt-6 pb-0 rounded-xl">
      <p className="text-sm text-muted-foreground text-center text-balance">
        If you&apos;d like to get updates on my writing, you can subscribe to my
        newsletter here.
      </p>
      <iframe
        src="https://thomasharmond.substack.com/embed"
        width="480"
        height="150"
        style={{ background: "white", width: "100%" }}
      ></iframe>
    </div>
  );
}
