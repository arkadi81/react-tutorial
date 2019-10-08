import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  //return promise
  return http.post(apiEndpoint, {
    email: user.username,
    name: user.name,
    password: user.password
  });
}

function movieUrl(movieId) {
  return `${apiUrl}/movies/${movieId}`;
}
export function getMovies() {
  return http.get(apiUrl + "/movies");
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  //note, no id
  if (movie._id) {
    //movie already exists - update
    // note - since we're passing id in the body of the request, server doesnt want the body of the request to have the id
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  // new movie
  return http.post(apiUrl + "/movies/", movie);
}
