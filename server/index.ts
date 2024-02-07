import { publicProcedure, router } from "./trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma";

const defaultDeckSelect = Prisma.validator<Prisma.DeckSelect>()({
  id: true,
  name: true,
  cards: true,
});

export const appRouter = router({
  getDecks: publicProcedure.query(async () => {
    console.log("getting decks from prisma");
    return await prisma.deck.findMany({ select: defaultDeckSelect });
  }),
  getDeck: publicProcedure
    .input(z.object({ deckId: z.number() }))
    .query(async ({ input: { deckId } }) => {
      return await prisma.deck.findUnique({
        select: defaultDeckSelect,
        where: { id: deckId },
      });
    }),
  createDeck: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input: { name } }) => {
      return await prisma.deck.create({ data: { name } });
    }),
  getCards: publicProcedure
    .input(z.object({ deckId: z.number() }))
    .query(async ({ input: { deckId } }) => {
      return await prisma.deckCard.findMany({ where: { deckId } });
    }),
  addCard: publicProcedure
    .input(
      z.object({
        deckId: z.number(),
        scryfallId: z.string(),
      }),
    )
    .mutation(async ({ input: { deckId, scryfallId } }) => {
      const card = await prisma.deckCard.create({
        data: { deckId, scryfallId, count: 1 },
      });

      return card;
    }),
  updateCardCount: publicProcedure
    .input(z.object({ cardId: z.number() }))
    .mutation(async ({ input: { cardId } }) => {
      const where = { id: cardId };
      const card = await prisma.deckCard.findUnique({ where });

      if (!card) throw Error("Card not found, cannot update card count.");

      return await prisma.deckCard.update({
        where,
        data: { count: card.count + 1 },
      });
    }),
});

export type AppRouter = typeof appRouter;
