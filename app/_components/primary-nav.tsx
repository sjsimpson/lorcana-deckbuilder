import ThemeToggle from "./theme-toggle";
import TopNav from "./top-nav";
import { Roboto_Mono } from "next/font/google";

export default function PrimaryNav() {
  return (
    <>
      <div className="fixed inline-flex justify-between min-w-full h-24 px-10 md:px-16 lg:px-24 z-10 text-black dark:text-white">
        <ThemeToggle />
        <TopNav />
      </div>
    </>
  );
}
