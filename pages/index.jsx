import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Cash, CreditCard, Headset, Truck } from "react-bootstrap-icons";
import Link from "next/link";
import landingImg from "@/public/assets/landing.png";
import Hero from "@/components/layouts/Hero";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearAll } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const { t } = useTranslation(["common", "home"]);

  const headData = {
    title: `${t("common:brand")} | ${t("home:brand_subtitle")}`,
    description: `${t("home:brand_subtitle2")}`,
  };

  // check if payment is successful after checkout redirects user here
  const dispatch = useDispatch();
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast(t("home:payment_successful"));
      dispatch(clearAll());
    }

    if (query.get("canceled")) {
      toast(t("home:payment_unsuccessful"));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <Hero
        title={t("common:brand")}
        subtitle={t("home:brand_subtitle")}
        img={landingImg}
      />
      <div id="home" className="">
        {/* -------------------- main paragraph -------------------- */}
        <div className="container my-2 my-lg-5 about-home">
          <h1 className="h1 fw-bold mb-0">{t("common:brand")}</h1>
          <h3 className="h3 text-primary">{t("home:brand_subtitle2")}</h3>
          <p className="lead fw-normal">{t("home:lorem40")}</p>
          <Link
            href="/products"
            className="btn btn-primary px-5 py-3 fw-bold text-light"
          >
            {t("home:shop_now")}
          </Link>
        </div>
        {/* -------------------- stats -------------------- */}
        <div className="container my-2 my-lg-5 stats-home">
          <div className="row text-center row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            <div className="col">
              <div className="p-2">
                <Cash className="text-danger h3 my-4 fs-1" />
                <h4 className="fw-bolder">{t("home:money_title")}</h4>
                <p>{t("home:money_subtitle")}</p>
              </div>
            </div>
            <div className="col">
              <div className="p-2">
                <Headset className="text-success h3 my-4 fs-1" />
                <h4 className="fw-bolder">{t("home:support_title")}</h4>
                <p>{t("common:support_subtitle")}</p>
              </div>
            </div>
            <div className="col">
              <div className="p-2">
                <Truck className="text-warning h3 my-4 fs-1" />
                <h4 className="fw-bolder">{t("home:ship_title")}</h4>
                <p>{t("home:ship_subtitle")}</p>
              </div>
            </div>
            <div className="col">
              <div className="p-2">
                <CreditCard className={`text-primary h3 my-4 fs-1`} />
                <h4 className="fw-bolder">{t("home:payment_title")}</h4>
                <p>{t("home:payment_subtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}
