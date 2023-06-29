import React, {useState, useEffect, useMemo, useTransition} from "react";
import {getGames, searchGames, getAllGames} from "../features/ui/helpers";
import GameCard from "../components/game-card";
import AddGameModal from "../features/games/add-game-modal";
import {SimpleGrid, GridItem, Button, useDisclosure, Input, InputGroup, InputRightElement, Box} from "@chakra-ui/react";
// import ReactPaginate from "react-paginate";
// Components needed: Search, GameCard
import Search from "../components/Search";
import AddGame from "../features/games/add-game-form";
import * as Yup from "yup";

export default function Games() {
  const [gamesList, setGamesList] = useState([]);
  const [filteredGamesList, setFilteredGamesList] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    getAllGames().then(data => {
      setAllGames(data.games)
    })
  }, [])

  // useEffect(() => {
  //   const filteredList = allGames.filter((game) => {
  //     const gameTitle = game.title ? game.title.toLowerCase() : "";
  //     return gameTitle.includes(searchQuery.toLowerCase());
  //   });

  //   setFilteredGamesList(filteredList);
  // }, [allGames, searchQuery]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    // const query = e.target.value
    // setSearchQuery(searchQuery);
    // const searchValue = searchGames(searchQuery)
    const filteredList = allGames.filter((game) => {
      const gameTitle = game.title ? game.title.toLowerCase() : "";
      return gameTitle.includes(searchValue);
      })
      setGamesList(filteredList);
      setSearchQuery(searchValue)
  }

  function toggleShowInputs() {
    setShowInputs(prev => !prev)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showInputs && (<AddGameModal isOpen={showInputs} onOpen={toggleShowInputs} onClose={toggleShowInputs}/>)}
      <div>
        <Button onClick={toggleShowInputs}>
          {showInputs ? "Hide Inputs" : "Show Inputs"}
        </Button>
        <Box>
          <InputGroup mt={4} width={{ base:"90%", md: "md" }} textAlign={"center"}>
            <Search value={searchQuery} onChange={handleSearch}/>
          </InputGroup>
        </Box>
      </div>
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
            {searchQuery === "" ? (
              gamesList.map((game) => <GameCard key={game.id} game={game}/>)
            ) : (
              gamesList.filter((game) =>
                game.title.toLowerCase().includes(searchQuery)
              )
              .map((game) => <GameCard key={game.id} game={game}/>)
            )}
            {/* {(filteredGamesList > 0 ? filteredGamesList : gamesList).map(game => (
              <GameCard key={game.id} game={game} />
            ))} */}
          </SimpleGrid>
        )}
      </div>
    </div>
  );
}
