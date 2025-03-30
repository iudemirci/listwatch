import { Link, useLocation } from "react-router-dom";
import Title from "../ui/Title";
import LogoIcon from "./LogoIcon";

function Logo() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return !isHomePage ? (
    <Link to="/home">
      <Title level={1} className={"flex items-center gap-1"}>
        <LogoIcon size={1.5} />
        <span className="hidden sm:block">list&watch</span>
      </Title>
    </Link>
  ) : (
    <div>
      <Title level={1} className={"flex cursor-pointer items-center gap-1"}>
        <LogoIcon size={1.5} />
        <span className="hidden sm:block">list&watch</span>
      </Title>
    </div>
  );
}

export default Logo;
