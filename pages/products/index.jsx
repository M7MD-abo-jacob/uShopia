import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Col, Row } from "react-bootstrap";
import Error from "next/error";
import ProductCard from "@/components/layouts/ProductCard";
import ProductsLayout from "@/components/layouts/ProductsLayout";
import Filter from "@/lib/filter";
import { axiosFakeStore } from "@/lib/axios";

export default function Shop({ products, Filters, err }) {
  const { t } = useTranslation(["common", "products"]);

  const headData = {
    title: `${t("common:brand")} | ${t("products:products_sup1")}`,
    description: `${t("products:products_sup2")}`,
  };

  if (err) {
    return <Error statusCode={err} />;
  }

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <ProductsLayout Filters={Filters}>
        <Col xs={12} lg={9}>
          {products.length < 1 ? (
            <h1 className="h1 text-center p-2 mt-5">
              {t("products:no_products_found")}
            </h1>
          ) : (
            <Row className="g-2">
              {products?.map((p) => (
                <ProductCard item={p} key={p.id} />
              ))}
            </Row>
          )}
        </Col>
      </ProductsLayout>
    </>
  );
}

export async function getServerSideProps({ query, locale }) {
  let data;
  let err = "";
  try {
    const res = await axiosFakeStore.get("/products/");
    data = res.data;
  } catch (error) {
    console.log(error.response?.status);
    err = error.response?.status || error.code || error;
  }

  let categories = [];
  data?.forEach((prod) => {
    if (!categories.includes(prod.category)) categories.push(prod.category);
  });

  const Filters = {
    categories,
    category: query.category || "all",
    withRating: query.rated || 0,
    searchQ: query.q || "",
    sortByName:
      (query.sorted?.startsWith("name") &&
        (query.sorted === "nameAsc" ? "a" : "d")) ||
      "",
    sortByPrice:
      (query.sorted?.startsWith("price") &&
        (query.sorted === "priceAsc" ? "a" : "d")) ||
      "",
  };
  const products = (data && Filter(data, query)) || [];

  return {
    props: {
      products,
      Filters,
      err,
      ...(await serverSideTranslations(locale, ["common", "products"])),
    },
  };
}
