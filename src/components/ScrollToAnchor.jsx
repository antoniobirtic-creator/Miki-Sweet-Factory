import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Kratki timeout da se DOM stigne renderirati prije scrolla //
    }
  }, [hash]);

  return null;
}
