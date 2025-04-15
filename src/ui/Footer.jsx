import Paragraph from "./Paragraph";

function Footer() {
  return (
    <footer className="z-20 flex h-9 min-w-full items-center gap-2 bg-black/70 px-6 py-8 sm:h-11 sm:justify-center md:h-12 lg:h-15 2xl:h-20">
      <Paragraph type={"secondary"}>
        &copy; 2025 ListWatch. Built by{" "}
        <a
          href="https://github.com/iudemirci"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-default text-grey-primary-light cursor-pointer underline"
        >
          iudemirci
        </a>
        . This app uses the TMDB API, but is not endorsed or certified by TMDB.
      </Paragraph>
    </footer>
  );
}

export default Footer;
