import Button from "./Button";
import { ArrayOfTempWatchedData } from "./MoviesWatched";

interface MoviesWatchedListProps extends ArrayOfTempWatchedData {
  onRemoveWatchedMovie: (id: string | undefined) => void;
}

function MoviesWatchedList({
  watched,
  isOpen2,
  onRemoveWatchedMovie,
}: MoviesWatchedListProps) {
  return (
    <>
      {isOpen2 && (
        <ul className="list">
          {watched.map((watchedMovie) => (
            <li key={watchedMovie.imdbID}>
              <img
                src={watchedMovie.poster}
                alt={`${watchedMovie.title} poster`}
              />
              <h3>{watchedMovie.title}</h3>
              <div>
                <p>
                  <span>⭐️</span>
                  <span>{watchedMovie.imdbRating}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{watchedMovie.userRating}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{watchedMovie.runtime} min</span>
                </p>
                <Button
                  el="button"
                  className="btn-delete"
                  onClick={() => onRemoveWatchedMovie(watchedMovie.imdbID)}
                >
                  x
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesWatchedList;
