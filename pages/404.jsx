import Link from "next/link";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import errImg from "@/public/assets/error.png";
import Hero from "@/components/layouts/Hero";

const NotFoundPage = () => {
  const { t } = useTranslation(["common", "404"]);

  const headData = {
    title: `${t("common:brand")} | ${t("404:err404")}`,
    description: `${t("404:err404")}`,
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
        <meta name="robots" content="noindex" />
      </Head>

      <Hero title="404" subtitle={t("404:err404")} img={errImg} />
      <Container className="text-center d-flex flex-column p-5 g-5">
        <h1 className="fw-bold h1"> {t("404:err_title")} </h1>
        <h2>{t("404:err_subtitle")}</h2>
        <h3>{t("404:err404")}</h3>
        <Row className="d-flex justify-content-center mt-3">
          <Col xs={3}>
            <Link href="/home" className="btn btn-primary w-100">
              {t("common:home")}
            </Link>
          </Col>
          <Col xs={3}>
            <Link href="/products" className="btn btn-primary w-100">
              {t("common:shop")}
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFoundPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "404"])),
    },
  };
}
