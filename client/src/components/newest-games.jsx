import React, {useState, useEffect} from "react";
import {getNewestGames} from "../features/ui/helpers";
import {
  Accordion,
  Box,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import NewGameAccordionItem from "./new-games-accordion-item";
export default function NewestGames() {
  const [newGames, setNewGames] = useState([]);
  useEffect(() => {
    getNewestGames().then(data => setNewGames(data));
  }, []);
  return (
    <div>
      <Accordion allowToggle>
        {newGames.map(game => (
          <NewGameAccordionItem key={game.id} game={game} />
        ))}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
