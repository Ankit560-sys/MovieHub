
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import Box from "./components/Box";
import Movielist from "./components/Movielist";

import Summary from './components/Summary';
import WatchedList from './components/WatchedList';
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from "./hooks/useLocalStorageState";






export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");



  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  function handleMovieDetails(id) {
    setSelectedId(selectedId => selectedId !== id ? id : null)
    console.log(id)

  }

  function handleClose() {
    setSelectedId(null)
  }



  return (
    <>

      <Navbar query={query} onSetQuery={setQuery} movies={movies} />

      <Main>
        <Box>

          {isLoading && <Loader />}
          {!isLoading && !error && <Movielist movies={movies} onSelect={handleMovieDetails} />}
          {error && <ErrorMessage message={error} />}

        </Box>




        <Box>
          {selectedId ? <MovieDetails watched={watched} selectedId={selectedId} onCloseMovie={handleClose} onAddWatched={handleAddWatched} /> :
            (<>
              <Summary watched={watched} />

              <WatchedList watched={watched} onDelete={handleDeleteWatched} />
            </>)
          }
        </Box>
      </Main>
    </>
  );
}



