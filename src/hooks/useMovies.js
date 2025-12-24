import { useEffect, useState } from "react";

export function useMovies(query) {
  const key = import.meta.env.VITE_APP_OMDB_API_KEY ;
  const url = import.meta.env.VITE_APP_API_URL ;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(
            `${url}?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something Went Wrong!");

          const data = await res.json();

        
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);

          setError("");
        } catch (err) {
         

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
