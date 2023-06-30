import React, {
  useState,
  useEffect,
  useMemo,
  useTransition,
  Suspense,
} from "react";
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
  Flex
} from "@chakra-ui/react";
import {ErrorBoundary} from "react-error-boundary";
// import ReactPaginate from "react-paginate";
// Components needed: Search, GameCard
import Search from "../components/Search";
import AddGame from "../features/games/add-game-form";
import Loading from "./loading";
import ErrorElement from "./error";
import GameSearch from "../features/ui/game-search";
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
  const [noResults, setNoResults] = useState(false);
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
      searchGames(search.toLowerCase()).then(games => {
        if (games.message) {
          setNoResults(prev => !prev);
          setSearchResults("");
        } else {
          setNoResults(prev => !prev);
          setSearchResults(games);
        }
      });
    } else {
      setSearchResults("");
    }
  }

  function toggleShowInputs() {
    setShowInputs(prev => !prev);
  }
  function fixSearchResults() {
    setSearchResults("");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-smokey">
      {showInputs && (
        <AddGameModal
          isOpen={showInputs}
          onOpen={toggleShowInputs}
          onClose={toggleShowInputs}
        />
      )}
      <div>
        <Flex>
          <Box>
          <Button 
            onClick={toggleShowInputs} 
            onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
            style={{
              marginTop:"20px",
              backgroundColor:"#6366F1",
              paddingRight:"20px",
              paddingLeft:"20px",
              boxShadow:"2px 2px 8px rgba(0, 0, 0, 1)",
              color:"white"
            }}>
            {showInputs ? "Hide Inputs" : "Show Inputs"}
          </Button>
          </Box>
          <Box style={{marginLeft:"50px"}}>
            <InputGroup
              mt={4}
              width={{base: "90%", md: "md"}}
              style={{
                marginTop:"20px", 
                borderWidth:"2px", 
                borderRadius:"8px",
                marginBottom:"10px",
              }}
              textAlign={"center"}>
              <Search search={searchQuery} handleSearch={handleSearch} />
            </InputGroup>
          </Box>
        </Flex>
      </div>
      <div className="my-4">
        <div className="mx-auto join w-1/3 grid grid-cols-2">
          <Button
            onMouseEnter={(e) => e.target.style.backgroundColor = "#101814"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#1E2D24"}
            style={{
              backgroundColor:"#1E2D24", 
              color:"white", 
              borderWidth: "2px",
              marginBottom: "20px"
              }}
            className={
              hasPrev
                ? "join-item btn btn-outline"
                : "join-item btn btn-outline btn-disabled"
            }
            onClick={() => setCurrentPage(current => current - 1)}>
            Previous page
          </Button>
          <button
            onMouseEnter={(e) => e.target.style.backgroundColor = "#101814"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#1E2D24"}
            style={{
              backgroundColor:"#1E2D24", 
              color:"white", 
              borderWidth: "2px",
              marginBottom: "20px"
            }}
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
          <Loading />
        ) : !searchResults ||
          searchResults.length < 2 ||
          searchResults == "" ? (
            <>
              <SimpleGrid columns={{sm: 2, md: 3}}>
                {gamesList.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </SimpleGrid>
            </>
        ) : (
          <ErrorBoundary FallbackComponent={ErrorElement}>
            <Suspense fallback={<Loading />}>
              {noResults ? (
                <div className="text-3xl text-tomato">No games found</div>
              ) : (
                <GameSearch results={searchResults} />
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
