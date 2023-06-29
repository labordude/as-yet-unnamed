import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import CommentCard from "./comment";
export default function Thread({thread}) {
  return (
    <Box w="65%" p={4} borderWidth="1px" className="mt-4 ml-10">
      <p>{thread.title}</p>
      {thread.comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}
