import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";

function UserCard({user}) {
    return (
        <Container className="px-4" p="2">
        <div className="card max-w-10 bg-base-10 shadow-xl">
            <figure className="px-0 pt-10 h-50 object-contain">
            <Image
                src={user.pfp_image}
                alt={user.username}
                boxSize="100px"
                objectFit="contain"
                className="rounded-xl"
            />
            </figure>
            <div className="card-body items-center text-center">
            <h2 className="card-title">{user.username}</h2>
            <div className="card-actions">
                <Link to={`/users/${user.id}`}>
                <Button colorScheme="blue">View Profile</Button>
                </Link>
            </div>
            </div>
        </div>
        </Container>
    );
}

export default UserCard