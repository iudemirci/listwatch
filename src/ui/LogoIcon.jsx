import Icon from "@mdi/react";
import { mdiFilmstrip } from "@mdi/js";

function LogoIcon({ size = 1 }) {
  return <Icon path={mdiFilmstrip} size={size} className="text-primary" />;
}

export default LogoIcon;
