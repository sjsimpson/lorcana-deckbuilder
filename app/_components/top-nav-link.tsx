import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function TopNavLink({
  name,
  href,
  updateOffset,
  updateWidth,
}: {
  name: string;
  href: string;
  updateOffset: (offset: number) => void;
  updateWidth: (offset: number) => void;
}) {
  const pathname = usePathname();
  const linkRef = useRef<HTMLDivElement>(null);

  const match = useMemo(() => {
    const rootPath = pathname.split("/")[1];
    return href.slice(1, href.length) === rootPath;
  }, [pathname, href]);

  useEffect(() => {
    if (match && linkRef.current) {
      if (updateOffset) {
        const offset = linkRef.current.offsetLeft;
        updateOffset(offset);
      }

      if (updateWidth) {
        const width = linkRef.current.offsetWidth;
        updateWidth(width);
      }
    }
  }, [match, updateOffset, updateWidth]);

  return (
    <div
      className="flex justify-center cursor-pointer hover:font-semibold"
      ref={linkRef}
    >
      <Link className="flex justify-center py-2 px-4 select-none" href={href}>
        <span className={roboto.className}>{name.toUpperCase()}</span>
      </Link>
    </div>
  );
}
