"use client";

import { trpc } from "@/app/_trpc/client";
import { Card } from "@/types/card";
import { DeckCard } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface StackImageProps {
  index: number;
  card: DeckCard;
  shifted: boolean;
  onHover: () => void;
  onLeave: () => void;
}
function StackImage(props: StackImageProps) {
  const { card, shifted, index, onHover, onLeave } = props;

  const scryfallCard = useQuery<Card>({
    queryKey: ["card", card.scryfallId],
    queryFn: async () => {
      return axios
        .get(`https://api.scryfall.com/cards/${card.scryfallId}`)
        .then((res) => res.data);
    },
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const calcPosition = (index: number) => {
    const basePosition = index * 30;
    return shifted
      ? (imageRef.current?.height || 0) + (index - 1) * 30
      : basePosition;
  };

  return (
    <div
      key={card.id}
      className="absolute rounded-tl-md rounded-tr-md h-fit overflow-hidden transition-[top] duration-50 ease-out cursor-pointer"
      style={{ top: `${calcPosition(index)}px` }}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => onLeave()}
    >
      {scryfallCard.isSuccess && (
        <Image
          ref={imageRef}
          src={scryfallCard.data.image_uris.normal}
          className="rounded-md"
          alt={scryfallCard.data.name + " - Card Art"}
          height={200}
          width={200}
        />
      )}
    </div>
  );
}

interface DecklistStackProps {
  deckId: number;
}
export default function DecklistStack(props: DecklistStackProps) {
  const { deckId } = props;

  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const cards = trpc.getCards.useQuery({ deckId });
  // NOTE: probably don't need to use a store here now becuase we are getting
  // it from trpc and our db
  // const decklist = useDecklistStore(selectors.list);

  return (
    <div
      className="relative flex flex-col w-full items-center"
      // TODO: Fix this static calculation of height
      style={{ height: `${cards.isSuccess && cards.data.length * 30 + 500}px` }}
    >
      {cards.isSuccess &&
        cards.data.map((item, index) => (
          <StackImage
            key={item.id}
            index={index}
            card={item}
            shifted={hovered !== undefined && index > hovered}
            onHover={() => setHovered(index)}
            onLeave={() => setHovered(undefined)}
          />
        ))}
    </div>
  );
}
