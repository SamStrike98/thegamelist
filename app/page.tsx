'use server'

import { getGames, createGame, deleteGame } from "@/actions/gameActions";
import { auth } from "@/auth";
import LoginGoogle from "@/components/LoginGoogle";


// Defining SearchParams interface
interface SearchParams {
  search?: string;
  platform?: string;
}

// Updated async component
export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const session = await auth();
  // const currSearchParams = await searchParams;

  // Properly handling the searchParams asynchronously
  const searchQuery = searchParams?.search ?? '';
  const platformFilter = searchParams?.platform ?? '';

  const games = await getGames(searchQuery, platformFilter);

  return (
    <main>
      <h1>Game List</h1>
      {session?.user ? (
        <form action={createGame}>
          <input className="input" name="title" placeholder="Game Title" required />
          <input className="input" name="notes" placeholder="Notes" />
          <select className="select" name="platform" defaultValue="PC">
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="PS4">PS4</option>
            <option value="PS3">PS3</option>
            <option value="PS2">PS2</option>
            <option value="PS1">PS1</option>
            <option value="Switch">Switch</option>
            <option value="Wii">Wii</option>
            <option value="Xbox360">Xbox 360</option>
          </select>
          <button className="btn" type="submit">Add Game</button>
        </form>
      ) : (
        <div>Login to add a game: <LoginGoogle /></div>
      )}

      {/* SEARCH FILTER FORM */}
      <form method="GET">
        <input
          className="input"
          type="text"
          name="search"
          placeholder="Search Games"
          defaultValue={searchQuery}
        />
        <select className="select" name="platform" defaultValue={platformFilter}>
          <option value="">All Platforms</option>
          <option value="PC">PC</option>
          <option value="PS5">PS5</option>
          <option value="PS4">PS4</option>
          <option value="PS3">PS3</option>
          <option value="PS2">PS2</option>
          <option value="PS1">PS1</option>
          <option value="Switch">Switch</option>
          <option value="Wii">Wii</option>
          <option value="Xbox360">Xbox 360</option>
        </select>
        <button className="btn btn-success" type="submit">Search</button>
      </form>

      <ul className="list bg-base-100 rounded-box shadow-md">
        {games && games.length > 0 ? (
          games.map((game) => (
            <li key={game.id} className="list-row">
              <div className="size-10 rounded-box"></div>
              <div>
                <div>{game.title}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{game.platform}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{game.owner?.name}</div>
              </div>
              <p className="list-col-wrap text-xs">{game.notes}</p>

              {session?.user?.id === game.ownerId && (
                <form action={deleteGame}>
                  <input type="hidden" name="gameId" value={game.id} />
                  <button className="btn btn-soft btn-error" type="submit">Delete</button>
                </form>
              )}
            </li>
          ))
        ) : (
          <p>No Games Found...</p>
        )}
      </ul>
    </main>
  );
}
