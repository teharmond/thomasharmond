import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export function Bookmarks({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height={height}
      width={width}
      {...props}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <path
          d="M12.25 17C12.0928 17 11.9365 16.9507 11.8047 16.854L7.5 13.6816L3.1953 16.854C2.9668 17.0215 2.66409 17.0474 2.41209 16.9194C2.15919 16.792 2 16.5327 2 16.25V6.75C2 5.2334 3.2334 4 4.75 4H10.25C11.7666 4 13 5.2334 13 6.75V16.25C13 16.5327 12.8408 16.792 12.5879 16.9194C12.4815 16.9736 12.3652 17 12.25 17Z"
          fill={secondaryfill}
          fillOpacity="0.4"
        />
        <path
          d="M14.8047 13.854C14.9365 13.9507 15.0928 14 15.25 14C15.3652 14 15.4815 13.9736 15.5879 13.9194C15.8408 13.792 16 13.5327 16 13.25V3.75C16 2.2334 14.7666 1 13.25 1H7.75C6.2334 1 5 2.2334 5 3.75V4H10.25C11.7666 4 13 5.2334 13 6.75V12.524L14.8047 13.854Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export function Projects({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height={height}
      width={width}
      {...props}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <path
          d="M6.75 7.75C6.75 7.33579 7.08579 7 7.5 7H12.25C12.6642 7 13 7.33579 13 7.75C13 8.16421 12.6642 8.5 12.25 8.5H7.5C7.08579 8.5 6.75 8.16421 6.75 7.75Z"
          fill={fill}
          fillRule="evenodd"
        />
        <path
          d="M11 11.25C11 10.8358 11.3358 10.5 11.75 10.5H13.75C14.1642 10.5 14.5 10.8358 14.5 11.25C14.5 11.6642 14.1642 12 13.75 12H11.75C11.3358 12 11 11.6642 11 11.25Z"
          fill={fill}
          fillRule="evenodd"
        />
        <path
          d="M5.5 4.25C5.5 3.83579 5.83579 3.5 6.25 3.5H8.25C8.66421 3.5 9 3.83579 9 4.25C9 4.66421 8.66421 5 8.25 5H6.25C5.83579 5 5.5 4.66421 5.5 4.25Z"
          fill={fill}
          fillRule="evenodd"
        />
        <path
          d="M2.75 2C3.16421 2 3.5 2.33579 3.5 2.75V12.75C3.5 13.4408 4.05921 14 4.75 14H15.25C15.6642 14 16 14.3358 16 14.75C16 15.1642 15.6642 15.5 15.25 15.5H4.75C3.23079 15.5 2 14.2692 2 12.75V2.75C2 2.33579 2.33579 2 2.75 2Z"
          fill={secondaryfill}
          fillOpacity="0.4"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

export function Tasks({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height={height}
      width={width}
      {...props}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <path
          d="M13.75 4.5H7.25C5.73122 4.5 4.5 5.73122 4.5 7.25V13.75C4.5 15.2688 5.73122 16.5 7.25 16.5H13.75C15.2688 16.5 16.5 15.2688 16.5 13.75V7.25C16.5 5.73122 15.2688 4.5 13.75 4.5Z"
          fill={secondaryfill}
          opacity="0.4"
        />
        <path
          d="M4.50001 13.75V7.24996C4.50001 5.73336 5.7334 4.49996 7.25 4.49996H13.0542L12.8998 3.4609C12.6769 1.9609 11.2757 0.922078 9.7755 1.14498L3.3461 2.10006C1.846 2.32296 0.807211 3.72432 1.03011 5.22432L1.98531 11.6538C2.17881 12.956 3.261 13.908 4.5244 13.9912C4.5173 13.9106 4.50001 13.8325 4.50001 13.75Z"
          fill={fill}
        />
        <path
          d="M9.60652 13.5C9.41702 13.5 9.23442 13.4287 9.09482 13.2988L7.48542 11.7988C7.18272 11.5161 7.16612 11.0415 7.44832 10.7387C7.73152 10.434 8.20612 10.4199 8.50882 10.7011L9.50882 11.6337L12.4043 7.79835C12.6533 7.46725 13.1231 7.40076 13.4551 7.65126C13.7852 7.90076 13.8516 8.37107 13.6016 8.70167L10.2051 13.2017C10.0772 13.3716 9.88282 13.4785 9.67192 13.497C9.64942 13.499 9.62802 13.5 9.60652 13.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
}
