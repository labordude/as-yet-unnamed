import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";
function GameCard({game}) {
  return (
    <Container className="px-4" p="2">
      <div className="card max-w-48 bg-base-100 shadow-xl">
        <figure className="px-0 pt-10 h-72 object-contain">
          <Image
            src={game.background_image}
            alt={game.title}
            boxSize="350px"
            objectFit="contain"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{game.title}</h2>
          <div className="text-bold text-xl">
            <div
              className="radial-progress text-charcoal ml-4"
              style={{
                "--value": game.rating && game.rating.toFixed(2),
              }}>
              {game.rating && game.rating.toFixed(2)}
            </div>
          </div>
          <div className="card-actions">
            <Link to={`/games/${game.id}`}>
              <Button colorScheme="blue">Get More Info</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GameCard;
