import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Spinner from "./Spinner";
import Button from "./Button";
import { NewWatchedMovieProps } from "../types";
import useKey from "../hooks/useKey";

type SelectedMovieProps = {
  selectedId: string;
  onCloseMovie: () => void;
  apiKEY: string;
  onAddWatched: (movie: NewWatchedMovieProps) => void;
  watched: NewWatchedMovieProps[];
};

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};

function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatched,
  apiKEY,
  watched,
}: SelectedMovieProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  //   const [isTop, setIsTop] = useState(imdbRating ?? 0 > 8);
  //   console.log(isTop)

  //   useEffect(function(){
  // setIsTop(imdbRating ?? 0 > 8)
  //   }, [imdbRating])

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ")[0]),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId, apiKEY]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `MOVIE: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <button onClick={onCloseMovie}>Close</button>
          <header>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={30}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <Button el="button" className="btn-add" onClick={handleAdd}>
                    Add to list
                  </Button>
                )}
              </>
            ) : (
              <p>
                You rated this movie {watchedUserRating} <span>⭐</span>
              </p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by the {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
