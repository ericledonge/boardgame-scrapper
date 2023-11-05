import { XMLParser } from "fast-xml-parser";
import { BGGUser } from "@/models/bgg-user";
import { BGGGameSchemaType, Game } from "@/models/game";

const BGG_URL = "https://boardgamegeek.com/xmlapi2/";

const parser = new XMLParser({
  attributeNamePrefix: "@_",
  ignoreAttributes: false,
});

export const getBggUserGames = async (user: BGGUser): Promise<Game[]> => {
  const response = await fetch(
    `${BGG_URL}/collection?username=${user.name}&own=1`,
  );

  const text = await response.text();

  const games = parser
    .parse(text)
    .items.item.map((game: BGGGameSchemaType) => ({
      // @ts-ignore
      id: game["@_objectid"],
      // @ts-ignore
      name: game.name["#text"],
      yearPublished: game.yearpublished,
      thumbnail: game.thumbnail,
    }));

  return games.sort((a: Game, b: Game) => {
    const yearA = parseInt(a.yearPublished, 10);
    const yearB = parseInt(b.yearPublished, 10);

    if (yearB - yearA !== 0) {
      return yearB - yearA;
    } else {
      return parseInt(b.id, 10) - parseInt(a.id, 10);
    }
  });
};
