import React, {useState, useEffect, useTransition, Suspense} from "react";
import {getUsers, searchGames, searchUsers} from "../features/ui/helpers";
import {Container, Image, Box, InputGroup, SimpleGrid} from "@chakra-ui/react";
import Search from "../components/Search";
import UserCard from "../components/user-card";
import {ErrorBoundary} from "react-error-boundary";
import ErrorElement from "./error";
import Loading from "./loading";
export default function Social() {
  const [usersList, setUsersList] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [isPending, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    getUsers(currentPage).then(data => {
      startTransition(() => {
        setUsersList(data.users);
        setHasNext(data.has_next);
        setHasPrev(data.has_prev);
        setCurrentPage(data.page);
      });
    });
  }, [currentPage]);

  function handleSearch(search) {
    if (search.length > 2) {
      searchUsers(search.toLowerCase()).then(users => {
        if (users.message) {
          setNoResults(prev => !prev);
          setSearchResults("");
        } else {
          setNoResults(prev => !prev);
          setSearchResults(users);
        }
      });
    } else {
      setSearchResults("");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-smokey">
      <div>
        <Box>
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
            <Search handleSearch={handleSearch} />
          </InputGroup>
        </Box>
      </div>
      <div className="my-4">
        <div className="mx-auto join w-1/3 grid grid-cols-2">
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
              hasPrev
                ? "join-item btn btn-outline"
                : "join-item btn btn-outline btn-disabled"
            }
            onClick={() => setCurrentPage(current => current - 1)}>
            Previous page
          </button>
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
          <div className="text-center text-4xl">
            Loading...
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : !searchResults || searchResults.length < 2 ? (
          usersList && usersList.length > 0 ? (
            <SimpleGrid columns={{sm: 2, md: 3}}>
              {usersList.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </SimpleGrid>
          ) : (
            <div style={{color:"#FE654F"}}>No users found</div>
          )
        ) : (
          <ErrorBoundary FallbackComponent={ErrorElement}>
            <Suspense fallback={<Loading />}>
              {noResults ? (
                <div className="text-3xl text-tomato">No users found</div>
              ) : (
                <SimpleGrid columns={{sm: 2, md: 3}}>
                  {searchResults.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </SimpleGrid>
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
