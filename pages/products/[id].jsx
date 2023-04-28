import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Error from "next/error";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ArrowBarLeft, Dash, Plus, StarFill } from "react-bootstrap-icons";
import { cart, minusOne, plusOne } from "@/redux/cartSlice";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RemoveFromCartBtn from "@/components/buttons/RemoveFromCartBtn";
import AddToCartBtn from "@/components/buttons/AddToCartBtn";
import { axiosFakeStore } from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import { toast } from "react-toastify";
import Image from "next/image";
import { mainSelector } from "@/redux/mainSlice";

const Product = ({ product, err }) => {
  const { t } = useTranslation(["common", "product"]);
  const { locale } = useRouter();
  const Cart = useSelector(cart);
  const dispatch = useDispatch();
  const { user } = useSelector(mainSelector);

  if (err) {
    return <Error statusCode={err} />;
  }

  const headData = {
    title: `${t("common:brand")} | ${product.title}`,
    description: product.description,
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <Container className="mt-3">
        <div>
          <Container className="py-2">
            <Row className="align-items-center flex-column flex-lg-row">
              <Col xs={11} lg={5} className="position-relative">
                <Image
                  src={`${product.image}`}
                  alt={`${product.title}`}
                  className={`${styles.product_img} d-block mb-3 mb-md-4 h-25 position-relative`}
                  fill
                />
              </Col>
              <Col xs={11} lg={7}>
                <Row className="d-flex flex-column mb-2">
                  <h3>{product.title}</h3>
                  <h5 className="text-primary">{product.category}</h5>
                  <p>{product.description}</p>
                  {/* ---------------- rating and reviews ---------------------- */}
                  <div className="mb-4" dir={locale === "ar" ? "rtl" : "ltr"}>
                    <div className="d-flex">
                      <p className="text-muted mb-2">{t("product:rating")}</p>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="cursor-pointer me-1">
                          {
                            <StarFill
                              className={`${
                                Math.round(product.rating.rate) > i
                                  ? "text-primary"
                                  : "text-muted"
                              }`}
                              fontSize="15px"
                            />
                          }
                        </span>
                      ))}
                      <div className="mx-3">({product.rating.rate})</div>
                    </div>
                    <div className="text-muted mb-2">
                      {t("product:reviewed_by")}
                      <span className="text-primary">
                        {product.rating.count}
                      </span>{" "}
                      {t("product:people")}
                    </div>
                  </div>
                  {/* ---------------------- price and btn ---------------------- */}
                  <Container>
                    <Row className="flex-column flex-md-row align-items-center justify-content-between">
                      <Col
                        xs={12}
                        md={4}
                        className="d-flex align-items-center justify-content-center justify-content-md-start"
                      >
                        {/* ---------------------- price ---------------------- */}
                        <h5 className="text-primary">
                          <span className="fs-1">
                            {"$" + product.price.toString().split(".")[0]}
                          </span>
                          {"."}
                          <span className="fs-5">
                            {product.price.toFixed(2).toString().split(".")[1]}
                          </span>
                        </h5>
                      </Col>
                      {/* ---------------------- qnt & remove ---------------------- */}
                      {user &&
                      Cart.findIndex((prod) => prod.id === product.id) > -1 ? (
                        <Col
                          xs={12}
                          md={8}
                          className="d-flex align-items-center justify-content-center justify-content-md-end"
                        >
                          <Row className="d-flex align-items-center justify-content-center flex-row">
                            {/* ---------------------- qnt ---------------------- */}
                            <Col xs={6}>
                              <Row className="d-flex justify-content-end align-items-center">
                                {/* ---------------------- plus/minus ---------------------- */}
                                <Col xs={4} className="p-0">
                                  <Button
                                    onClick={() => {
                                      try {
                                        dispatch(minusOne(product));
                                      } catch (error) {
                                        console.log(error);
                                        toast.error(t(error));
                                      }
                                    }}
                                  >
                                    <Dash />
                                  </Button>
                                </Col>
                                <Col xs={4} className="p-0 text-center">
                                  <div className="w-100 h3">
                                    {
                                      Cart[
                                        Cart.findIndex(
                                          (prod) => prod.id === product.id
                                        )
                                      ].count
                                    }
                                  </div>
                                </Col>
                                <Col xs={4} className="p-0">
                                  <Button
                                    onClick={() => {
                                      dispatch(plusOne(product));
                                    }}
                                  >
                                    <Plus className="fw-bolder" />
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                            {/* ---------------------- remove ---------------------- */}
                            <Col xs={6}>
                              <RemoveFromCartBtn product={product} />
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <Col
                          xs={8}
                          className="d-flex align-items-center justify-content-center justify-content-md-end"
                        >
                          <div className="align-self-end">
                            <AddToCartBtn product={product} />
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Container>
                  <div className="d-flex justify-content-between w-100">
                    {/* ---------------------- back to shop btn ---------------------- */}
                  </div>
                  <Link
                    href="/products"
                    className="btn btn-outline-primary col-auto d-flex align-self-center align-self-md-start  text-center align-items-center mt-4"
                  >
                    <ArrowBarLeft className="mx-2" />
                    {t("product:back_to_shop")}
                  </Link>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Product;

export async function getServerSideProps({ query, locale }) {
  let product = "";
  let err = "";
  try {
    const res = await axiosFakeStore.get(`/products/${query.id}`);
    product = res.data;
  } catch (error) {
    err = error.response?.status || error.code || error;
    console.log(err);
  }
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
      err,
      ...(await serverSideTranslations(locale, ["common", "product"])),
    },
  };
}
