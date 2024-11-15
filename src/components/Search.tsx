import { useEffect, useRef } from "react";
import Input from "./Input";

type SearchProps = {
  query: string;
  setQuery: (value: string) => void;
};

function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") inputEl.current?.focus();
      setQuery("");
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <>
      <Input
        className="search"
        type="text"
        name="search"
        id="search"
        label="Search bar"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}

export default Search;
