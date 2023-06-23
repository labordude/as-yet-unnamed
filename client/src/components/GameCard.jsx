import React from "react";
import {Link} from "react-router-dom";
function GameCard({game}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10 h-48">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-xl max-h-48"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{game.name}</h2>
        <p>Rating: {game.rating}</p>
        <div className="card-actions">
          <Link to={`/games/${game.id}`}>Get More Info</Link>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
