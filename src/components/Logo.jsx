import { Link } from "react-router-dom";
import Title from "./Title";
import Icon from "@mdi/react";
import { mdiMovieOpen } from "@mdi/js";

function Logo() {
  return (
    <Link to="/home">
      <Title level={1} className={"flex items-center gap-1"}>
        <Icon path={mdiMovieOpen} size={1} className="text-primary" />
        <span>list&watch</span>
      </Title>
    </Link>
  );
}

export default Logo;
