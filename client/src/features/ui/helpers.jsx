// get newest reviews
export async function getNewestReviews() {
  return fetch("/newest_reviews")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error.error));
}

// get newest games
export async function getNewestGames() {
  return fetch("/newest_games")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error.error));
}

export async function getCommunities() {
  return fetch("/api/communities")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error.error));
}
