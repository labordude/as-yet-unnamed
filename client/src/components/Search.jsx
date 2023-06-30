import React from "react";
import {Input} from "@chakra-ui/react";

export default function Search({handleSearch}) {
  function handleChange(event) {
    console.log(event.target.value);
    handleSearch(event.target.value);
  }
  return (
    <Input
      placeholder="Search..."
      onChange={event => handleChange(event)}
      style={{color: 'white'}}
      name="search"
    />
  );
}
