"use client";

import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DecksProps {}

export default function Decks(props: DecksProps) {
  const [name, setName] = useState("");

  const getDecks = trpc.getDecks.useQuery();
  const createDeck = trpc.createDeck.useMutation({
    onSuccess: () => {
      getDecks.refetch();
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <div className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-row w-full gap-2">
          <Input
            // className="relative flex flex-row px-4 py-2 rounded shadow-none focus:outline-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={() => createDeck.mutate({ name })}
            disabled={!name}
            // className="px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          >
            + New Deck
          </Button>
        </div>
        <ul className="flex flex-col gap-1">
          {getDecks.isSuccess &&
            getDecks.data.map((deck) => (
              <li key={deck.id}>
                <Link
                  href={`/builder/${deck.id}`}
                  className="flex flex-row w-full gap-2 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
                >
                  <div>{deck.name}</div>
                  <div>{deck.id}</div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
