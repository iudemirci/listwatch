import Github from "./Github";
import Paragraph from "./Paragraph";

function Footer() {
  return (
    <footer className="flex h-9 min-w-full items-center gap-2 bg-black/70 px-6 py-8 sm:h-11 sm:justify-center md:h-12 lg:h-15 2xl:h-20">
      <Github />
      <Paragraph type={"secondary"}>
        &copy; This website was created by Ihsan U. Demirci for educational
        purposes only. 2025
      </Paragraph>
    </footer>
  );
}

export default Footer;
