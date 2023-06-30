import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";

function UserCard({user}) {
    return (
        <Container className="px-4 bg" p="2" >
        <div
            style={{
                boxShadow:"2px 5px 8px rgba(0, 0, 0, 1)",
                marginRight:"10px",
                marginLeft:"10px",
                marginBottom:"10px",
            }}
            className="card max-w-10 bg-charcoal shadow-xl">
            <figure className="px-0 pt-10 h-50 object-contain">
            <Image
                src={
                    user.pfp_image
                        ? user.pfp_image
                        : "https://placekitten.com/250/250"
                }
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
                <Button 
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
                    style={{
                        backgroundColor:"#6366F1", 
                        color:"white", 
                        marginTop:"10px"
                    }}>View Profile</Button>
                </Link>
            </div>
            </div>
        </div>
        </Container>
    );
}

export default UserCard
