import { MoviesProps } from "./MoviesList";

type ArrayOfObjects = {
  movies: MoviesProps[];
};

function NumResults({ movies }: ArrayOfObjects) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
