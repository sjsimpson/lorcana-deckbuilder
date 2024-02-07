"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import TopNavLink from "./top-nav-link";
import { links } from "@/constants/nav-links";

export default function TopNav() {
  // TODO: Transition this to be a hook/store, so we don't have to pass props
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex">
        <div
          className="absolute flex w-24 h-full border border-solid border-black dark:border-white transition-all ease-out duration-200 pointer-events-none"
          style={{
            width,
            translate: position,
            display: !!width ? "block" : "none",
          }}
        />
        {links.map((link) => (
          <TopNavLink
            key={link.href}
            href={link.href}
            name={link.name}
            updateOffset={setPosition}
            updateWidth={setWidth}
          />
        ))}
      </div>
    </div>
  );
}
