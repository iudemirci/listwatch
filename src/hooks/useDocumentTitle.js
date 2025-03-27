import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useDocumentTitle(pageTitle, loading = true) {
  const location = useLocation();

  useEffect(() => {
    if (!loading && pageTitle) document.title = pageTitle;
  }, [location, pageTitle, loading]);
}

export default useDocumentTitle;
