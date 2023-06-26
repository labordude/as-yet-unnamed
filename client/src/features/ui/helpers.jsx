// get newest reviews
export async function getNewestReviews() {
  return fetch("/api/newest_reviews")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => console.log(error));
}

// get newest games
export async function getNewestGames() {
  return fetch("/api/newest_games")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => console.log(error));
}

export async function getCommunities() {
  return fetch("/api/communities")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

export async function getGames(page = 1) {
  return fetch(`/api/games?page=${page}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

export async function getGamesByID(id) {
  return fetch(`/api/games/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}
