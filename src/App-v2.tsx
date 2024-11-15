import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MoviesWatched from "./components/MoviesWatched";
import MoviesList from "./components/MoviesList";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MoviesWatchedList from "./components/MoviesWatchedList";
import Spinner from "./components/Spinner";
import Error from "./components/Error";
import SelectedMovie from "./components/SelectedMovie";
import Container from "./components/Container";
import { NewWatchedMovieProps } from "./types";

const KEY = "4f9d36cf";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState<NewWatchedMovieProps[]>([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // useEffect(function () {
  //   console.log("A");
  // }, []);

  // useEffect(function () {
  //   console.log("B");
  // });

  // useEffect(function () {
  //   console.log("C");
  // }, [query]);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: NewWatchedMovieProps) {
    setWatched((watched) => [...watched, movie]);

    // const isSelected = watched.find((item) => item.imdbID === movie.imdbID);
    // return isSelected ? watched : [...watched, movie];
  }

  function handleRemoveWatchedMovie(id: string | undefined) {
    setWatched((watched) => watched.filter((item) => item.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            // @ts-expect-error //it lacks typescript config
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          //@ts-expect-error //reason is the new keyword
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search || []);
          setError("");
        } catch (err) {
          const errorMessage = (err as Error).message || "Uknown error";
          console.error(errorMessage);

          if (err.name !== "AbortError") {
            setError(errorMessage);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <main className="main">
        {/* {isLoading ? (
          <Spinner />
        ) : (
          <MoviesList
            movies={movies}
            isOpen1={isOpen1}
            setIsOpen1={setIsOpen1}
          />
        )} */}
        {isLoading && <Spinner />}
        {!isLoading && !error && (
          <MoviesList
            movies={movies}
            isOpen1={isOpen1}
            setIsOpen1={setIsOpen1}
            onSelectMovie={handleSelectMovie}
          />
        )}
        {error && <Error message={error} />}
        {selectedId ? (
          <Container as="div" className="box">
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              apiKEY={KEY}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          </Container>
        ) : (
          <MoviesWatched
            isOpen2={isOpen2}
            setIsOpen2={setIsOpen2}
            watched={watched}
          >
            <MoviesWatchedList
              watched={watched}
              isOpen2={isOpen2}
              onRemoveWatchedMovie={handleRemoveWatchedMovie}
            />
          </MoviesWatched>
        )}
      </main>
    </>
  );
}
