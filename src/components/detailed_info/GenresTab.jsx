import { capitalize } from "lodash";
import Title from "../../ui/Title";
import DetailedInfoButton from "./DetailedInfoButton";
import { Link } from "react-router-dom";
import Paragraph from "../../ui/Paragraph";

function GenresTab({ item, keywords }) {
  const keywordsMerged = keywords?.keywords || keywords || [];

  return (
    <div className="flex flex-col gap-3.5 pt-2">
      <div className="flex flex-col gap-y-1">
        <Title level={5} type="white">
          Genres
        </Title>
        <div className="flex flex-wrap gap-x-1 gap-y-1.5">
          {item?.genres?.map((genre) => (
            <Link
              key={genre.id}
              to={`/discover?type=${"movie"}&genre=${genre.id}`}
            >
              <DetailedInfoButton>{genre.name}</DetailedInfoButton>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <Title level={5} type="white">
          Keywords
        </Title>
        <div className="flex flex-wrap gap-x-1 gap-y-1.5">
          {isNaN(keywordsMerged) ? (
            keywordsMerged?.map((keyword) => (
              <DetailedInfoButton key={keyword.id}>
                {capitalize(keyword.name)}
              </DetailedInfoButton>
            ))
          ) : (
            <Paragraph type="tertiary">No keywords found</Paragraph>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenresTab;
