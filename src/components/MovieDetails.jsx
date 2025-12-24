import  { useEffect, useState, useRef } from "react";

import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const key = import.meta.env.VITE_APP_OMDB_API_KEY ;
  const url = import.meta.env.VITE_APP_API_URL ;

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

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
    imdbId,
  } = movie;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "MovieHub";
        
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `${url}?apikey=${key}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    const newWatchedMovie = {
      title,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      imdbID: selectedId,
      poster: poster,
      year: year,
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <button className="btn btn-back" onClick={onCloseMovie}>
            ↩{" "}
          </button>
          <header>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>

              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setMovieRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating}🌟 </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring by {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
