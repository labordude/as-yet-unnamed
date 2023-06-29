import React from "react";
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
import GameCard from "../../components/game-card";
export default function GameSearch({results}) {
  console.log(results);
  return (
    <SimpleGrid columns={{sm: 2, md: 3}}>
      {results.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </SimpleGrid>
  );
}
