"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
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
    <div className={styles.topToBottom}>
      {showTopBtn ? (
        <button 
          onClick={goToTop} 
          className={styles.btnStyle}
          aria-label="Scroll back to top"
          title="Scroll back to top"
        >
          <ArrowUp className={styles.iconStyle} strokeWidth={2.5} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
};
export default ScrollToTop;
