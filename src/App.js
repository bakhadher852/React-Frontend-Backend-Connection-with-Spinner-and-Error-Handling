import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(null);

  const fetchMoviesHandler = useCallback(async function() {
    try {
      setIsLoading(true);
      serError(null);
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        //making error message
        throw new Error("something went wrong!");
      }
      const data = await res.json();

      //we take what we need from the object
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);

      setIsLoading(false);
    } catch (error) {
      serError(error.message);
    }
    //to stop loading when error happen
    setIsLoading(false);
  }, []);

  //we call the function once when we reload the app the page is ready
  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  let content = <p>Found no movies ☹</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}> Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>Found no movies ☹</p>
        )}
        {!isLoading && error && <p>{error} </p>}
      </section>
    </React.Fragment>
  );
}

export default App;

//another syntacs

// function fetchMoviesHandler() {
//   setIsLoading(true);
//   serError(null);
//   fetch("https://swapi.dev/api/films/")
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       //we take what we need from the object
//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//       setIsLoading(false);
//     });
// }
