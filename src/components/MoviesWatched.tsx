import { ReactNode } from "react";

import Toggle from "./Toggle";
import Container from "./Container";
import { NewWatchedMovieProps } from "../types";

export type ArrayOfTempWatchedData = {
  watched: NewWatchedMovieProps[];
  children?: ReactNode;
  isOpen2: boolean;
  setIsOpen2?: React.Dispatch<React.SetStateAction<boolean>>;
};

type WatchedMoviesToggleProps = ArrayOfTempWatchedData;

function MoviesWatched({
  watched,
  isOpen2,
  setIsOpen2,
  children,
}: WatchedMoviesToggleProps) {
  const average = (arr: number[]) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating ?? 0));
  const avgUserRating = average(watched.map((movie) => movie.userRating ?? 0));
  const avgRuntime = average(watched.map((movie) => movie.runtime ?? 0));

  return (
    <Container as="div" className="box">
      <div className="summary">
        <Toggle isOpen={isOpen2} setIsOpen={setIsOpen2 || (() => {})} />
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
      {children}
    </Container>
  );
}

export default MoviesWatched;
