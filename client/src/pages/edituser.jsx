import React, {useEffect, useState} from "react";
import Navbar from "./components/NavBar";
import Header from "./components/Header";


// navigated in here from signup form
// lead to profile when done editing 
export default function EditUser() {
    // need a edit user for for the edituser react Route
    function handleGet(event) {
        event.preventDefault();
        fetch("api/users/<int:id>", {
            
        })
    } 


    pass
}