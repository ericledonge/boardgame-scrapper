import { getBggUserGames } from "@/services/get-bgg-user-games";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Game } from "@/models/game";

export default async function Home() {
  const games = await getBggUserGames({ name: "Empyrium" });

  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Year Published</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game: Game) => (
            <TableRow key={game.name}>
              <TableCell>{game.name}</TableCell>
              <TableCell>
                <img src={game.thumbnail} alt={game.name} />
              </TableCell>
              <TableCell>{game.yearPublished}</TableCell>
              <TableCell>
                <a
                  href={`https://boardgamegeek.com/boardgame/${game.id}`}
                  target={"_blank"}
                >
                  Link
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
