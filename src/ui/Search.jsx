import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { debounce } from "lodash";
import { AnimatePresence, motion } from "motion/react";

import Spinner from "./Spinner";
import SearchResultItem from "./SearchResultItem";

import { useSearchData } from "../hooks/moviedb/useSearchData";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  //debounce to avoid excessive api calls
  const debouncedSearchTerm = useMemo(() => debounce(setSearchTerm, 500), []);

  //api callc
  const { data, isPending } = useSearchData(searchTerm, {
    enabled: searchTerm.length > 2,
    // placeholderData: keepPreviousData,
  });

  //sort by popularity
  data && data?.results?.sort((a, b) => b?.popularity - a?.popularity);

  // hides results if outside is clicked
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // listens to page change to clear and hide results
  useEffect(() => {
    debouncedSearchTerm.cancel();
    setInputValue("");
    setSearchTerm("");
    setIsOpen(false);
  }, [location.pathname]);

  function handleSearchInputChange(e) {
    setInputValue(e.target.value);
    debouncedSearchTerm(e.target.value);
    setIsOpen(e.target.value.length > 2);
  }

  function handleFocus() {
    if (inputValue.length > 2) {
      setIsOpen(true);
    }
  }
  return (
    <div className="flex sm:relative lg:order-3">
      <div className="relative">
        <input
          ref={inputRef}
          id="search"
          type="text"
          name="search-xyxy"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={inputValue}
          className="bg-text-default text-grey-secondary h-6.5 w-40 rounded-2xl pr-8 pl-3 text-xs opacity-30 transition-opacity duration-300 group-hover/header:opacity-100 focus:opacity-100 2xl:h-7 2xl:w-50"
          onChange={handleSearchInputChange}
          onFocus={handleFocus}
        />
        <Icon
          path={mdiMagnify}
          size={1}
          className="text-grey-secondary/60 absolute top-1/2 right-1 -translate-y-1/2"
        />
      </div>

      <AnimatePresence>
        {isOpen && searchTerm.length > 2 && (
          <motion.ul
            className="divide-grey-primary outline-grey-primary/50 absolute bottom-0 left-0 z-200 w-full translate-y-1/1 divide-y-1 overflow-hidden rounded-lg outline-1 sm:-bottom-2 sm:left-1/2 sm:w-90 sm:-translate-x-1/2"
            // className="divide-grey-primary outline-grey-primary absolute -bottom-1 left-1/2 z-200 w-90 -translate-x-1/2 translate-y-1/1 divide-y-1 rounded-lg outline-1"
            ref={searchRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isPending ? (
              <div className="bg-grey-tertiary flex h-20 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              data?.results
                ?.slice(0, 8)
                .map((result, i) => (
                  <SearchResultItem key={i} result={result} />
                ))
            )}
            {data?.results?.length === 0 && (
              <li className="bg-grey-tertiary flex h-20 items-center justify-center">
                No results
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;
