import { useState, useEffect } from "react";
export const useMediaQuery = () => {
  const [mq, setMq] = useState({
    isPc: window.matchMedia("screen and (min-width: 576px)").matches,
    isMobile: window.matchMedia("screen and (max-width: 575px)").matches,
  });

  useEffect(() => {
    const onResize = () => {
      setMq({
        isPc: window.matchMedia("screen and (min-width: 576px)").matches,
        isMobile: window.matchMedia("screen and (max-width: 575px)").matches,
      });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  });

  return mq;
};
