
import Movie from './Movie'

const Movielist = ({ movies, onSelect }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  )
}

export default Movielist



