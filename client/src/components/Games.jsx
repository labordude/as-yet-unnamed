import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GameCard from "./GameCard";
function Games() {
  const [rawgData, setRawgData] = useState([]);
  useEffect(() => {
    fetch("/games")
      .then(response => response.json())
      .then(data => setRawgData(data.results));
  }, []);

  //   displayGames = fetchData.then(
  //     rawgData.results.map(result => <li>{result.name}</li>),
  //   );
  return (
    <div className="container m-auto grid grid-cols-3">
      {rawgData.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default Games;
