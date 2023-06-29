import {redirect} from "react-router-dom";
// finished with something go somewhere else

// get newest reviews
export async function getNewestReviews() {
  return fetch("/api/newest_reviews")
    .then(response => {
      if (response.ok) {
        console.log(response);
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

//get community
export async function getCommunities() {
  return fetch("/api/communities")
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// get Games on Page Load ???
export async function getGames(page = 1) {
  return fetch(`/api/games?page=${page}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Get Games by ID
export async function getGamesByID(id) {
  return fetch(`/api/games/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// GAMES PATCH
export async function updateGame(id, values) {
  return fetch(`/api/games/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// GAMES DELETE
export async function deleteGame(id) {
  return fetch(`/api/games/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return redirect("/games");
      }
    })
    .catch(error => console.log(error));
}

//change edit user from lowercase "id" to uppercase
export async function getUserByID(id) {
  return fetch(`/api/users/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Check for Current User
export async function getCurrentUser() {
  return fetch(`/api/check_session`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Post user a.k.a creat a user
export async function createUser(values) {
  return fetch(`/api/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(newUser => {
      return newUser;
      // navigate('/editformpageything')
    });
}

// Update/PATCH user by ID
export async function updateUser(id, values) {
  return fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Delete User by ID
export async function deleteUser(id) {
  return fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// get User per page load??
export async function getUsers(page = 1) {
  return fetch(`/api/users?page=${page}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// get for a search For GAMES
export async function searchGames(search) {
  return fetch(`/api/search/${search}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Get all Games
export async function getAllGames() {
  return fetch(`/api/games`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// Post for followers in User
export async function followUser(username) {
  return fetch(`/api/follow/${username}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: username}),
  })
    .then(response => response.json())
    .then(newFollow => {
      console.log(newFollow);
      // return newFollow;
    });
}

// Post for Following in User
export async function unFollowUser(username) {
  return fetch(`/api/unfollow/${username}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: username}),
  })
    .then(response => response.json())
    .then(newUnFollow => {
      console.log(newUnFollow);
      // return newUnFollow;
    });
}
