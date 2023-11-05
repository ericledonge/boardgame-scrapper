import { XMLParser } from "fast-xml-parser";
import { z } from "zod";

type Game = {
  id: string;
  name: string;
  yearPublished: string;
  thumbnail: string;
};

const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
  yearpublished: z.string(),
  thumbnail: z.string(),
});

type GameSchemaTypes = z.infer<typeof GameSchema>;

const BGG_URL =
  "https://boardgamegeek.com/xmlapi2/collection?username=Empyrium&own=1";

const parser = new XMLParser({
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
});

export default async function Home() {
  const response = await fetch(BGG_URL);
  const text = await response.text();

  const games = parser.parse(text).items.item.map((game: GameSchemaTypes) => ({
    // @ts-ignore
    id: game["@_objectid"],
    // @ts-ignore
    name: game.name["#text"],
    yearPublished: game.yearpublished,
    thumbnail: game.thumbnail,
  }));

  const orderedGames = games.sort((a: Game, b: Game) => {
    const yearA = parseInt(a.yearPublished, 10);
    const yearB = parseInt(b.yearPublished, 10);

    if (yearB - yearA !== 0) {
      return yearB - yearA;
    } else {
      return parseInt(b.id, 10) - parseInt(a.id, 10);
    }
  });

  return (
    <main>
      <ul>
        {orderedGames.map((game: Game) => (
          <li key={game.name}>
            <img src={game.thumbnail} alt={game.name} />
            <h2>{game.name}</h2>
            <p>{game.yearPublished}</p>
            <a
              href={`https://boardgamegeek.com/boardgame/${game.id}`}
              target={"_blank"}
            >
              Link
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
