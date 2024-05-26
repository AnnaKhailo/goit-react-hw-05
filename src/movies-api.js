import axios from "axios";

export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTcxMDJjNmE4NjY4YjBkMDAyYjUwYmZkMjQ0ZTQyYSIsInN1YiI6IjY2NTFkNzA5ZTgzMmI3OTU0NzU1YWFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lgQBzo0jvvoKuNrjSAmtAmxtbgW3YWl1wY7euNLkVLg";
export const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

axios.defaults.baseURL = "https://api.themoviedb.org";

export const getMovies = async (query) => {
  const response = await axios.get("/3/search/movie", {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await axios.get("/3/trending/movie/day", options);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/3/movie/${movieId}/reviews`, options);
  return response.data;
};
