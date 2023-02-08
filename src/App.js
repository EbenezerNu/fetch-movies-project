import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movieList, setMovieList] = useState([]);
  const fetchMoviesHandler = () => {
    console.log("Fetching movies ...");
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        console.log("Received response ...");
        return response.json();
      })
      .then((data) => {
        let id = 1;
        console.log("Res", data);
        if (data.results.length > 0) {
          const movies = data.results.map((movie) => {
            return {
              id: id++,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date,
            };
          });
          setMovieList(movies);
        }
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieList} />
      </section>
    </React.Fragment>
  );
}

export default App;
