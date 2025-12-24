import { useRef } from 'react'
import { useKey } from '../hooks/useKey';


export const Navbar = ({ query, onSetQuery, movies }) => {

  const inputEl = useRef(null);


  useKey("Enter", function () {
    if (document.activeElement === inputEl.current)
      return;
    inputEl.current.focus();
    onSetQuery("");

  })


  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>MovieHub</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        ref={inputEl}
        onChange={(e) => onSetQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  )
}

export default Navbar;