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
      </Accordion>
    </div>
  );
}
