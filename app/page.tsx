import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="">
      Hello.
      <br />
      <br />
      Currently building{" "}
      <Link className="text-blue-500 underline" href="https://trivo.app">
        Trivo
      </Link>
    </div>
  );
}
