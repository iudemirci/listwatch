import Slider from "react-slick";
import PaddingBottom from "../ui/PaddingBottom";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import MoviePoster from "./Poster";
import LinkToId from "../ui/LinkToId";

function PosterList({ movies, title, type, autoPlay = 11000 }) {
  var settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: autoPlay,
    pauseOnHover: true,
    buttons: true,
    nextArrow: <NextArrow onClick={() => slickNext} />,
    prevArrow: <PrevArrow onClick={() => slickPrev} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };

  function NextArrow({ onClick }) {
    return (
      <button
        className="bg-primary absolute top-[50%] right-0 block translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-md px-0.5 py-1.5 text-[12px] 2xl:px-1.5 2xl:py-3"
        onClick={onClick}
      >
        <Paragraph>&rarr;</Paragraph>
      </button>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <button
        className="bg-primary absolute top-[50%] left-0 z-1 block translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-md px-0.5 py-1.5 text-[12px] 2xl:px-1.5 2xl:py-3"
        onClick={onClick}
      >
        <Paragraph>&larr;</Paragraph>
      </button>
    );
  }

  return (
    <PaddingBottom>
      <Title level={3}>{title}</Title>
      <ul className="pt-2 2xl:pt-4">
        <Slider {...settings}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="border-grey-secondary aspect-[2/3] cursor-grab border-1"
            >
              <LinkToId movieID={movie?.id} type={type}>
                <MoviePoster path={movie?.poster_path} />
              </LinkToId>
            </li>
          ))}
        </Slider>
      </ul>
    </PaddingBottom>
  );
}

export default PosterList;
