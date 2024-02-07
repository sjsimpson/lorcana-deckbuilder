import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HELLO WORLD
      <Button asChild>
        <Link href="/decks">START BUILDING +</Link>
      </Button>
    </main>
  );
}
