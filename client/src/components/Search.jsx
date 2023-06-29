import React from "react";
import {Input} from "@chakra-ui/react";

export default function Search({search, handleSearch}) {
  function handleChange(event) {
    handleSearch(event.target.value);
  }
  return (
    <Input
      placeholder="Search Games"
      value={search}
      onChange={event => handleChange(event)}
      style={{color: '#1E2D24'}}
    />
  );
}
