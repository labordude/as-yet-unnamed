import React from "react";
import {
  Box,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
// Accordion = threads
function NewGameAccordionItem({game}) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {game.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <span className="text-sm">{game.description}</span>

        <Link
          to={`/games/${game.id}`}
          className="text-sm underline text-center">
          Click here for more details
        </Link>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default NewGameAccordionItem;
