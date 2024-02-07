"use client";

import { useCardQuery } from "@/queries/card";
import { selectors, useDecklistStore } from "@/stores/decklist";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/types/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/app/_trpc/client";

interface SearchItemProps {
  card: Card;
  onSelect: (card: Card) => void;
}
function SearchItem(props: SearchItemProps) {
  const { card, onSelect } = props;
  return (
    <li
      key={card.id}
      className="flex flex-row px-2 py-1 justify-between hover:bg-gray-200 hover:cursor-pointer"
      onMouseDown={() => {
        console.log(JSON.stringify(card));
        onSelect(card);
      }}
    >
      <div>{card.name}</div>
      {card.prices.usd && (
        <div className="flex flex-row justify-between w-1/6">
          <div>$</div>
          <div>{card.prices.usd}</div>
        </div>
      )}
    </li>
  );
}
interface CardSearchProps {
  deckId: number;
}
export default function CardSearch(props: CardSearchProps) {
  const { deckId } = props;

  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  // const addToDecklist = useDecklistStore(selectors.addCard);

  const inputRef = useRef<HTMLInputElement>(null);

  const { query } = useCardQuery(searchTerm);

  const getCards = trpc.getCards.useQuery({ deckId });
  const addCard = trpc.addCard.useMutation({
    onSuccess: () => {
      getCards.refetch();
    },
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setSearchTerm(value), 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "/" && !focused && inputRef.current) {
      e.preventDefault();
      // e.stopPropagation();
      inputRef.current.focus();
    }

    if (e.key === "Escape" && inputRef.current) {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleSelect = (card: Card) => {
    // addToDecklist(card);
    addCard.mutate({ deckId, scryfallId: card.id });
    setValue("");
  };

  return (
    <div className="relative flex flex-col min-w-full">
      <div className="relative flex flex-col w-1/3">
        <Input
          ref={inputRef}
          // className="relative flex flex-row px-4 py-2 rounded shadow-none focus:outline-black"
          placeholder="Search for a card"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {query.isFetching && (
          <div className="absolute flex flex-row top-2 right-4">loading...</div>
        )}
      </div>
      {focused && searchTerm && query.isSuccess && (
        <ul
          className={
            "absolute flex flex-col max-h-80 py-2 px-2 w-1/3 bg-white rounded shadow-sm z-10 overflow-y-scroll"
          }
          style={{ left: 0, top: 41 }}
        >
          {query.isSuccess &&
            query.data.data.map((card: Card) => (
              <SearchItem key={card.id} card={card} onSelect={handleSelect} />
            ))}
        </ul>
      )}
    </div>
  );
}
