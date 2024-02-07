import { create } from "zustand";
import { Card } from "@/types/card";

interface DecklistState {
  list: { card: Card; count: number }[];
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  resetDecklist: () => void;
}

export const useDecklistStore = create<DecklistState>()((set, get) => ({
  list: [],
  addCard: (card: Card) =>
    set((state) => {
      if (state.list.find((item) => item.card.id === card.id)) {
        return {
          list: state.list.map((item) =>
            item.card.id === card.id
              ? { ...item, count: item.count + 1 }
              : item,
          ),
        };
      }
      return { list: [...state.list, { card: card, count: 1 }] };
    }),
  removeCard: (id: string) =>
    set((state) => {
      const index = state.list.findIndex((item) => item.card.id === id);
      if (index !== -1) {
        const list = [...state.list];
        list.splice(index, 1);
        return { list };
      }
      return { list: state.list };
    }),
  incrementCount: (id: string) =>
    set((state) => ({
      list: state.list.map((item) =>
        item.card.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    })),
  decrementCount: (id: string) =>
    set((state) => {
      const index = state.list.findIndex((item) => item.card.id === id);
      if (index !== -1) {
        if (state.list[index].count === 1) {
          const list = [...state.list];
          list.splice(index, 1);
          return { list };
        }

        return {
          list: state.list.map((item) =>
            item.card.id === id ? { ...item, count: item.count - 1 } : item,
          ),
        };
      }

      return { list: state.list };
    }),
  resetDecklist: () =>
    set({
      list: [],
    }),
}));

export const selectors = {
  list: (state: DecklistState) => state.list,
  addCard: (state: DecklistState) => state.addCard,
  removeCard: (state: DecklistState) => state.removeCard,
  incrementCount: (state: DecklistState) => state.incrementCount,
  decrementCount: (state: DecklistState) => state.decrementCount,
  resetDecklist: (state: DecklistState) => state.resetDecklist,
};
