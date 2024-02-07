-- CreateTable
CREATE TABLE "DeckCard" (
    "id" SERIAL NOT NULL,
    "scryfallId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,

    CONSTRAINT "DeckCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeckCard" ADD CONSTRAINT "DeckCard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
