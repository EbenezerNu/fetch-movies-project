import React, { useState, useRef, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const btnRef = useRef();
  const fetchMoviesHandler = () => {
    if (loading === true) return;
    console.log("Fetching movies ...");
    btnRef.current.disabled = true;
    setLoading(true);
    setError(false);
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        console.log("Received response ...");
        if (!response.ok) {
          throw Error("Failed to fetch movies");
        }
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
          setError(false);
          setLoading(false);
          setMovieList(movies);
        }
      })
      .catch(() => {
        console.log("Something went wrong");
        setError(true);
        setLoading(false);
      });
    btnRef.current.disabled = false;
  };

  // useEffect(() => {
  //   console.log("Button has been clicked");
  // }, [btnRef?.current?.disabled]);
  let content = <p></p>;
  if (loading) {
    content = <p>Loading ...</p>;
  } else if (error) {
    content = <p>Something went wrong</p>;
  } else if (movieList.length > 0) {
    content = <MoviesList movies={movieList} />;
  } else if (movieList.length === 0) {
    content = <p>No movie found</p>;
  } else {
    content = <p>Oops</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} ref={btnRef}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
