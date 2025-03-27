import { Link } from "react-router-dom";
import Title from "../ui/Title";
import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <Link to="/home">
      <Title level={1} className={"flex items-center gap-1"}>
        <LogoIcon />
        <span>list&watch</span>
      </Title>
    </Link>
  );
}

export default Logo;
