import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";
function GameCard({game}) {
  return (
    <Container className="px-4" p="2" >
      <div 
        className="card max-w-48 bg-base-100 shadow-xl bg-charcoal" 
        style={{
          boxShadow:"4px 5px 8px rgba(0, 0, 0, 1)",
          marginLeft:"10px",
          marginRight:"10px",
        }}>
        <figure className="px-0 pt-10 object-contain" >
          <Image
            src={game.background_image}
            alt={game.title}
            // boxSize="300px"
            maxwidth={300}
            objectFit="align"
            maxHeight={375}
            border='2px' 
            borderColor='gray.200'
            className="rounded-xl"
            // borderRadius='full'
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{game.title}</h2>
          <div className="text-bold text-xl">
            <div
              className="radial-progress text-tomato "
              style={{
                "--value": game.rating && game.rating.toFixed(2),
                marginTop: "10px",
                marginBottom: "10px"
              }}>
              {game.rating && game.rating.toFixed(2)}
            </div>
          </div>
          <div className="card-actions">
            <Link to={`/games/${game.id}`}>
              <Button 
                onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
                style={{
                  backgroundColor:"#6366F1",
                  color:"white"
                }}>Get More Info</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GameCard;
