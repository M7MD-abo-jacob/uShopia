import Head from "next/head";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { EnvelopeAtFill } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import supportImg from "@/public/assets/support.png";
import Hero from "@/components/layouts/Hero";

const Support = () => {
  const { t } = useTranslation(["common", "support"]);

  const headData = {
    title: `${t("common:brand")} | ${t("support:customer_title")}`,
    description: `${t("support:contact_us_sub")}`,
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <Hero
        title={t("support:customer_title")}
        subtitle={t("support:support_subtitle")}
        img={supportImg}
      />
      <h1 className="text-center fw-bold">{t("support:contact_us")}</h1>
      <Container className="contact border border-3 border-primary rounded-3">
        <Row>
          <Col md={3} className="bg-primary text-light">
            <div className="mt-2 mt-md-5">
              <EnvelopeAtFill size={100} className="mb-2 mb-md-5 mx-auto" />
              <h2 className="fw-bold mb-2 mb-md-5">
                {t("support:contact_us")}
              </h2>
              <h4>{t("support:contact_us_sub")}</h4>
            </div>
          </Col>
          <Col md={9} className="mt-2 mt-md-3">
            <Form className="">
              <FormGroup className="form-group mb-3 w-100">
                <FormLabel>{t("support:first_name")}</FormLabel>
                <Form.Control
                  type="text"
                  required
                  placeholder={t("support:enter_first_name")}
                />
              </FormGroup>
              <FormGroup className="form-group mb-3 w-100">
                <FormLabel>{t("support:last_name")}</FormLabel>
                <Form.Control
                  type="text"
                  required
                  placeholder={t("support:enter_last_name")}
                />
              </FormGroup>
              <FormGroup className="form-group mb-3 w-100">
                <FormLabel>{t("support:email")}</FormLabel>
                <Form.Control
                  type="email"
                  required
                  placeholder={t("support:enter_email")}
                />
              </FormGroup>

              <FormGroup className="form-group mb-3 w-100">
                <FormLabel>{t("support:comment")}</FormLabel>
                <Form.Control as="textarea" rows={5} />
              </FormGroup>
              <Button className="mb-3 text-light px-5 fs-4">
                {t("support:submit")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Support;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "support"])),
    },
  };
}
