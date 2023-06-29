import React, {useState, useEffect, useMemo, useTransition} from "react";
import {getGames, searchGames, getAllGames} from "../features/ui/helpers";
import GameCard from "../components/game-card";
import AddGameModal from "../features/games/add-game-modal";
import {
  SimpleGrid,
  GridItem,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getGames(currentPage).then(data => {
      setGamesList(data.games);
      setHasNext(data.has_next);
      setHasPrev(data.has_prev);
      setCurrentPage(data.page);
    });
  }, [currentPage]);

  // useEffect(() => {
  //   getAllGames().then(data => {
  //     setAllGames(data.games);
  //   });
  // }, []);

  function handleSearch(search) {
    // setSearchQuery(search.toLowerCase());

    if (search.length > 2) {
      console.log(searchResults);
      searchGames(search.toLowerCase()).then(games => setSearchResults(games));
    } else {
      setSearchResults("");
    }
  }

  function toggleShowInputs() {
    setShowInputs(prev => !prev);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showInputs && (
        <AddGameModal
          isOpen={showInputs}
          onOpen={toggleShowInputs}
          onClose={toggleShowInputs}
        />
      )}
      <div>
        <Button onClick={toggleShowInputs}>
          {showInputs ? "Hide Inputs" : "Show Inputs"}
        </Button>
        <Box>
          <InputGroup
            mt={4}
            width={{base: "90%", md: "md"}}
            textAlign={"center"}>
            <Search search={searchQuery} handleSearch={handleSearch} />
          </InputGroup>
        </Box>
      </div>
      <div className="my-4">
        <div className="mx-auto join w-1/3 grid grid-cols-2">
          <Button
            className={
              hasPrev
                ? "join-item btn btn-outline"
                : "join-item btn btn-outline btn-disabled"
            }
            onClick={() => setCurrentPage(current => current - 1)}>
            Previous page
          </Button>
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
        ) : !searchResults ||
          searchResults.length < 2 ||
          searchResults == "" ? (
          <SimpleGrid columns={{sm: 2, md: 3}}>
            {gamesList.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={{sm: 2, md: 3}}>
            {searchResults.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        )}
      </div>
    </div>
  );
}
