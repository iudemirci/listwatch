import Icon from "@mdi/react";
import { mdiMovieOpen } from "@mdi/js";

function LogoIcon({ size = 1 }) {
  return <Icon path={mdiMovieOpen} size={size} className="text-primary" />;
}

export default LogoIcon;
