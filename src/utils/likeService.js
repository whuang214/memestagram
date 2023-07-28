import tokenService from "./tokenService";

const BASE_URL = "/api/likes";

// POST /likes/:id/
function addLike(postId) {
  // console.log("creating like for post ->", postId);
  return fetch(`${BASE_URL}/${postId}`, {
    method: "POST",
    headers: {
      // b/c user is logged in
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    // if res from server is ok, return json
    if (res.ok) return res.json();
    // else throw error
    throw new Error("Something went wrong in create like");
  });
}

// DELETE /likes/:id
function removeLike(postId) {
  return fetch(`${BASE_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Something went wrong in delete like");
  });
}

export default {
  addLike,
  removeLike,
};
