"use client";

import { selectors, useDecklistStore } from "@/stores/decklist";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
// import { trpc } from "@/app/_trpc/client";

export default function Decklist() {
  const decklist = useDecklistStore(selectors.list);
  const incrementCount = useDecklistStore(selectors.incrementCount);
  const decrementCount = useDecklistStore(selectors.decrementCount);
  const removeCard = useDecklistStore(selectors.removeCard);

  // const getDecks = trpc.getDecks.

  return (
    <div>
      Decklist
      {decklist.map((item) => (
        <div key={item.card.id}>
          <div>
            {item.card.id} {item.count}
            <Image
              src={item.card.image_uris.normal}
              alt={item.card.name + " - Card Art"}
              height={200}
              width={200}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button onClick={() => incrementCount(item.card.id)}>add +</Button>
            <Button onClick={() => decrementCount(item.card.id)}>
              remove -
            </Button>
            <Button onClick={() => removeCard(item.card.id)}>delete</Button>
          </div>
        </div>
      ))}
      <button onClick={() => console.log(decklist)}>print list</button>
    </div>
  );
}
