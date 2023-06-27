import React, {useState, useEffect, useMemo, useTransition} from "react";
import {getGames} from "../features/ui/helpers";
import GameCard from "../components/game-card";
import {SimpleGrid, GridItem} from "@chakra-ui/react";
// import ReactPaginate from "react-paginate";
// Components needed: Search, GameCard

export default function Games() {
  const [gamesList, setGamesList] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    getGames(currentPage).then(data => {
      startTransition(() => {
        setGamesList(data.games);
        setHasNext(data.has_next);
        setHasPrev(data.has_prev);
        setCurrentPage(data.page);
      });
    });
  }, [currentPage]);

  return (
    <div className="my-4">
      <div className="mx-auto join w-1/3 grid grid-cols-2">
        <button
          className={
            hasPrev
              ? "join-item btn btn-outline"
              : "join-item btn btn-outline btn-disabled"
          }
          onClick={() => setCurrentPage(current => current - 1)}>
          Previous page
        </button>

        <button
          className={
            hasNext
              ? "join-item btn btn-outline"
              : "join-item btn btn-outline btn-disabled"
          }
          onClick={() => setCurrentPage(current => current + 1)}>
          Next
        </button>
      </div>
      {isPending ? (
        <div className="text-center text-4xl">
          Loading...
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <SimpleGrid columns={{sm: 2, md: 3}}>
          {gamesList.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
}
