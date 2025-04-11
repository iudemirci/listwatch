import { useInView, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import Title from "../../ui/Title";
import { twMerge } from "tailwind-merge";

function Section({ title, mount, className, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: true,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isInView) {
      setMounted(true);
    }
  }, [isInView]);

  return (
    <section ref={ref}>
      {!mount ? (
        mounted && (
          <motion.div
            className={twMerge("divide-grey-primary/40 divide-y-1", className)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            {title && <Title level={3}>{title}</Title>}
            {children}
          </motion.div>
        )
      ) : (
        <div
          className={twMerge("divide-grey-primary/40 divide-y-1", className)}
        >
          {title && <Title level={3}>{title}</Title>}
          {children}
        </div>
      )}
    </section>
  );
}

export default Section;
