import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { links } from "@/data/data";
import BgIcons from "@/components/footer/BgIcons";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      id="footer"
      className="page-footer position-relative font-small mt-5 pt-4 pt-lg-5 bg-gradient bg-secondary bg-opacity-10"
    >
      <BgIcons />
      <Container className="text-center text-md-left">
        <Row>
          <Col md={8} className="mt-md-0 mt-3">
            <h5 className="text-uppercase">{t("brand")}</h5>
            <p>{t("lorem20")}</p>
          </Col>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <Col md={4} className="mb-md-0 mb-3">
            <h5 className="text-uppercase">{t("links")}</h5>
            <nav>
              <ul className="list-unstyled">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.link} className="text-primary">
                      {t(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Col>
        </Row>

        <div className="footer-copyright text-center py-3">
          <span>&#169; {t("copyright")}</span>
          <a
            href="https://m7md-abo-jacob.github.io/uShopia---my-fake-store/"
            className="text-primary"
          >
            {t("author")}
          </a>
          {t("rights")}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
