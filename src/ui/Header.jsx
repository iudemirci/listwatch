import useWindowWidth from "../hooks/useWindowWidth";
import Logo from "./Logo";
import PageNavList from "./PageNavList";
import Search from "./Search";

function Header() {
  const width = useWindowWidth();

  return (
    <header className="flex items-center justify-between py-2">
      <Logo />
      <div className="flex items-center gap-2 transition 2xl:gap-4">
        {width <= 640 && <Search />}
        <PageNavList />
        {width > 640 && <Search />}
      </div>
    </header>
  );
}

export default Header;
