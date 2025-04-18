import { twMerge } from "tailwind-merge";
import { mdiChevronRight } from "@mdi/js";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";

import Title from "../../ui/Title";

function Section({ title, linkID, mount, className, children }) {
  return (
    <section>
      {!mount ? (
        <div
          className={twMerge("divide-grey-primary/40 divide-y-1", className)}
        >
          {title && <Title level={3}>{title}</Title>}
          {children}
        </div>
      ) : (
        <div
          className={twMerge("divide-grey-primary/40 divide-y-1", className)}
        >
          <div>
            {title &&
              (linkID ? (
                <Link to={linkID}>
                  <div className="group flex items-center">
                    <Title
                      level={3}
                      className="group-hover:text-primary line-clamp-1 duration-300"
                    >
                      {title}
                    </Title>
                    <Icon
                      path={mdiChevronRight}
                      size={1}
                      className="group-hover:text-primary duration-300"
                    ></Icon>
                  </div>
                </Link>
              ) : (
                <Title level={3}>{title}</Title>
              ))}
          </div>
          {children}
        </div>
      )}
    </section>
  );
}

export default Section;
