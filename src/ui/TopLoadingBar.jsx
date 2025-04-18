import { memo, useEffect, useRef } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const customStyles = document.createElement("style");
customStyles.textContent = `
  #nprogress .bar {
    background-color: #dc2626 !important;
    height: 3px !important;
  }
  
  #nprogress .peg {
    box-shadow: 0 0 10px #dc2626, 0 0 5px #dc2626 !important;
  }
`;
document.head.appendChild(customStyles);

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  trickleSpeed: 200,
  easing: "ease",
  speed: 500,
});

function TopLoadingBar({ isLoading }) {
  const intervalRef = useRef(null);
  const loadingStateRef = useRef(false);

  useEffect(() => {
    if (isLoading !== loadingStateRef.current) {
      loadingStateRef.current = isLoading;

      if (isLoading) {
        NProgress.start();

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
          if (NProgress.status < 0.8) {
            NProgress.inc(0.1);
          } else {
            NProgress.set(0.9);
          }
        }, 800);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        NProgress.done(true);
      }
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      NProgress.done();
    };
  }, [isLoading]);

  return null;
}

export default memo(TopLoadingBar);
