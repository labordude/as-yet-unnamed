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

export async function getCurrentUser() {
  return fetch(`/api/@me`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

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

export async function deleteUser(id) {
  return fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getUsers(page = 1) {
  return fetch(`/api/users?page=${page}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

export async function searchGames(search) {
  return await fetch(`/api/search/${search}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

export async function searchUsers(search) {
  return fetch(`/api/search_users/${search}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

export async function getAllGames() {
  return fetch(`/api/games`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}
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

// community threads
export async function getCommunityThreads(id) {
  return await fetch(`/api/community_threads/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// thread by ID
export async function getThreadComments(id) {
  return await fetch(`/api/threads/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}

// post a thread comment
export async function addThreadComments(id, values) {
  return fetch(`/api/thread_comments/${id}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(values),
  })
    .then(response => response.json())

    .catch(error => setErrors(error));
}

// like a comment
export async function likeComment(id) {
  return fetch(`/api/like_comment/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({}),
  })
    .then(response => response.json())

    .catch(error => setErrors(error));
}

// unlike a comment
export async function unlikeComment(id) {
  return fetch(`/api/unlike_comment/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({}),
  })
    .then(response => response.json())

    .catch(error => setErrors(error));
}

// like a comment
export async function likeThread(id) {
  return fetch(`/api/like_thread/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({}),
  })
    .then(response => response.json())

    .catch(error => setErrors(error));
}

// unlike a comment
export async function unlikeThread(id) {
  return fetch(`/api/unlike_thread/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({}),
  })
    .then(response => response.json())

    .catch(error => setErrors(error));
}


// community name
export async function getCommunityName(id) {
  return await fetch(`/api/community_names/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => setErrors(error));
}
