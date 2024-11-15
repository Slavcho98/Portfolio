import Container from "./Container";
import Toggle from "./Toggle";

export interface MoviesProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

type MoviesListToggle = {
  isOpen1: boolean;
  setIsOpen1: React.Dispatch<React.SetStateAction<boolean>>;
  movies: MoviesProps[];
  onSelectMovie: (id: string) => void;
};

function MoviesList({
  isOpen1,
  setIsOpen1,
  movies,
  onSelectMovie,
}: MoviesListToggle) {
  return (
    <Container as="div" className="box">
      <Toggle isOpen={isOpen1} setIsOpen={setIsOpen1} />

      {isOpen1 && (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default MoviesList;
