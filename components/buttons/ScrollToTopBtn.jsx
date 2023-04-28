import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CaretUp } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";

const ScrollToTopBtn = () => {
  const { t } = useTranslation();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <>
      {showTopBtn && (
        <Button
          variant="success"
          className="border-dark mb-3 mb-lg-5 border border-2 position-fixed shadow d-flex align-items-center"
          style={{
            bottom: "0",
            right: "10%",
            zIndex: "1000",
            // height: "",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <CaretUp className="fs-1 display-1 fw-bolder mx-1" />
          {t("to_top")}
        </Button>
      )}
    </>
  );
};

export default ScrollToTopBtn;
