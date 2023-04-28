import { useState } from "react";
import { useTranslation } from "next-i18next";
import { CloseButton, Col, Container, Row } from "react-bootstrap";

const Announcements = () => {
  const { t } = useTranslation();
  const [displayed, setDisplayed] = useState(true);

  return (
    displayed && (
      <Container
        fluid
        className={`${
          displayed ? "d-block" : "d-none"
        } text-bg-secondary py-0 text-center fs-6 text-light`}
      >
        <Container>
          <Row className="w-100 align-items-center position-relative">
            <Col>
              <small className="">{t("announcement")}</small>
            </Col>
            <Col xs={1}>
              <CloseButton
                className="ps-auto px-4"
                onClick={() => {
                  setDisplayed(false);
                }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    )
  );
};

export default Announcements;
