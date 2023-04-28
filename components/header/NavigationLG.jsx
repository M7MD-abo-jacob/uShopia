import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { links } from "@/data/data";

const NavigationLg = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <Container fluid className="mt-0 d-none d-lg-block bg-success text-center">
      <Container>
        <Row>
          {links.map((link) => (
            <Col key={link.name} xs={3} className="h5 p-0 mb-0">
              <Link
                href={link.link}
                className={`d-block py-1 ${
                  pathname === `${link.link}`
                    ? "text-dark fw-bold"
                    : "text-light"
                }`}
              >
                {t(link.name)}
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default NavigationLg;
