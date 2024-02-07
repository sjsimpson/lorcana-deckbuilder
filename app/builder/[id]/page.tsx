import Link from "next/link";
import CardSearch from "./_components/card-search";
import Decklist from "./_components/decklist";
import DecklistStack from "./_components/decklist-stack";
interface Props {
  params: { id: string };
}

export default function BuilderId(props: Props) {
  const {
    params: { id },
  } = props;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <div>
        <Link href="/decks" className="group flex flex-row gap-1 items-center">
          <span className="translate-x-0 transition-transform duration-100 group-hover:-translate-x-2">
            {"<-"}
          </span>
          <span className="pointer-events-none">Back to My Decks</span>
        </Link>
      </div>
      <CardSearch deckId={parseInt(id)} />
      <DecklistStack deckId={parseInt(id)} />
      <Decklist />
    </main>
  );
}
