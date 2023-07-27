// we need to use tokenService to get the token for our requests
import tokenService from "./tokenService";

const BASE_URL = "/api/posts/";
// getting the line app.use in server.js

// MAKE A POST REQUEST
export function create(data) {
  return fetch(BASE_URL, {
    method: "POST",
    body: data,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage and and it to our api request
    },
  }).then((res) => {
    // after we get the response from the server, we check if the response is ok
    if (res.ok) return res.json();
    throw new Error("Something went wrong in create post");
  });
  //   console.log("Sending data to server...", data);
}

// MAKE A GET REQUEST
export function getAll() {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      // convention to include the token in the header of a request
      // so that the server can verify the request
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    // if the response is okay, return the json data from the response
    if (res.ok) return res.json();
    // else throw an error
    throw new Error("Something went wrong in getAll posts");
  });
}
