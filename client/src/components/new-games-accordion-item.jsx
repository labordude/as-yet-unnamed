import React from "react";
import {
  Box,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
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
        <p className="text-center">
          <a className="text-sm underline">Click here for more details</a>
        </p>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default NewGameAccordionItem;
