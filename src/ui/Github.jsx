import { mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";

function Github() {
  return (
    <a href="https://github.com/iudemirci" target="_tab">
      <Icon path={mdiGithub} size={1.7} />
    </a>
  );
}

export default Github;
