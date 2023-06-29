import React, {useState, useEffect, useTransition} from "react";
import {getUsers} from "../features/ui/helpers";
import {Container, Image, Box, InputGroup, SimpleGrid} from "@chakra-ui/react";
import Search from "../components/Search";
import UserCard from "../components/user-card";
export default function Social() {
  const [usersList, setUsersList] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [isPending, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  function handleSearch() {}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
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
        ) : !searchResults || searchResults.length < 2 ? (
          usersList && usersList.length > 0 ? (
            <SimpleGrid columns={{sm: 2, md: 3}}>
              {usersList.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </SimpleGrid>
          ) : (
            <div>No users found</div>
          )
        ) : (
          <SimpleGrid columns={{sm: 2, md: 3}}>
            {searchResults.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </SimpleGrid>
        )}
      </div>
    </div>
  );
}
