import { useState } from "react";

import Button from "../../ui/Button";
import PaddingBottom from "../../ui/PaddingBottom";
import Title from "../../ui/Title";
import Paragraph from "../../ui/Paragraph";
import Poster from "../Poster";
import LinkToId from "../../ui/LinkToId";

function TopList({ movies }) {
  return (
    <PaddingBottom>
      <div className="flex flex-col items-center gap-4">
        <ul className="grid w-[100%] grid-cols-4 gap-1.5 lg:grid-cols-5">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-grey-secondary aspect-[2/3] rounded-lg"
            >
              <LinkToId movieID={movie?.id}>
                <Poster path={movie?.poster_path} />
              </LinkToId>
            </li>
          ))}
        </ul>
      </div>
    </PaddingBottom>
  );
}

export default TopList;
