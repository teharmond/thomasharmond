import React from "react";

export default function Substack() {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center rounded-xl border p-4 px-2 pt-6 pb-0">
      <p className="text-muted-foreground text-center text-sm text-balance">
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
