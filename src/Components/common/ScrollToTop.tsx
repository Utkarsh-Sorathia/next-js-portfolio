"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/scroll.module.css";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleShowBtn = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleShowBtn);

    return () => window.removeEventListener("scroll", handleShowBtn);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[4999] transition-all duration-300">
      {showTopBtn ? (
        <button
          onClick={goToTop}
          className="w-12 h-12 rounded-full bg-[var(--dialogColor)] border-2 border-[var(--primaryColor)] text-[var(--primaryColor)] flex items-center justify-center shadow-lg hover:bg-[var(--primaryColor)] hover:text-white transition-all duration-300 active:scale-90 group"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUpLong} className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      ) : null}
    </div>
  );
};
export default ScrollToTop;
