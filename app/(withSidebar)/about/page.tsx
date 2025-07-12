import Link from "next/link";
import React from "react";
import Image from "next/image";

const image = "/tandr.jpg";

export default function page() {
  return (
    <div className="space-y-4">
      <p>
        I&apos;m Thomas. I live in Houston with my wife, Rylea, and our two
        dogs, Theo and Roo.
      </p>

      <p>
        I&apos;m currently working on{" "}
        <span className="inline">
          <Link
            href="https://churchspace.co"
            className="inline items-baseline group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="h-5 w-5 bg-[#6065fe] mr-1.5 rounded items-center justify-center inline-flex">
              <svg
                height={14}
                width={14}
                viewBox="0 0 185 291"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none">
                  <path
                    d="M142.177 23.3423H173.437C179.612 23.3423 184.617 28.3479 184.617 34.5227V258.318C184.617 264.493 179.612 269.498 173.437 269.498H142.177V23.3423Z"
                    fill="white"
                  />
                  <path
                    d="M0 57.5604C0 52.8443 2.9699 48.6392 7.41455 47.0622L125.19 5.27404C132.441 2.70142 140.054 8.07871 140.054 15.7722V275.171C140.054 282.801 132.557 288.172 125.332 285.718L7.55682 245.715C3.03886 244.18 0 239.939 0 235.167V57.5604Z"
                    fill="white"
                  />
                </g>
              </svg>
            </span>
            <span className="underline decoration-2 underline-offset-2 group-hover:underline-offset-4 transition-all duration-300 ease-in-out">
              Church Space
            </span>
          </Link>
          , a platform helping churches free their ministry from app overload.
          Before this, I worked at Hillsong Church in Sydney, Australia where I
          also earned a bachelor&apos;s degree in theology.
        </span>
      </p>

      <p>
        I also serve as a pastoral resident at a local church here in Houston.
      </p>
      <Image
        src={image}
        alt="Thomas and Rylea"
        width={1200}
        height={1200}
        className="w-full rounded-lg"
      />
    </div>
  );
}
