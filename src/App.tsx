import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const KEY = "4f9d36cf";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState<NewWatchedMovieProps[]>(
    [],
    "watched"
  );
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);

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

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]))

    // const isSelected = watched.find((item) => item.imdbID === movie.imdbID);
    // return isSelected ? watched : [...watched, movie];
  }

  function handleRemoveWatchedMovie(id: string | undefined) {
    setWatched((watched) => watched.filter((item) => item.imdbID !== id));
  }

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
