import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  Facebook,
  Linkedin,
  Twitter,
} from "react-bootstrap-icons";
import aboutImg from "@/public/assets/about.png";
import Hero from "@/components/layouts/Hero";
import { aboutIcons, aboutPeople } from "@/data/data";
import styles from "@/styles/About.module.css";
import Image from "next/image";

const About = () => {
  const { t } = useTranslation(["common", "about"]);
  const { locale } = useRouter();

  const headData = {
    title: `${t("common:brand")} | ${t("about:about_sub")}`,
    description: `${t("about:about_sub")}`,
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <Hero
        title={t("about:about_title")}
        subtitle={t("about:about_sub")}
        img={aboutImg}
      />
      <section className={`${styles.section} ${styles.our_webcoderskull}`}>
        <div className="container">
          <div className={`row ${styles.heading}`}>
            <h2 className="text-center fw-bold">{t("about:our_team")}</h2>
          </div>
          <ul className="row d-flex m-0 p-0 align-items-center">
            {aboutPeople.map((i) => (
              <li key={i.name} className="col-12 col-md-6 col-lg-3">
                <div
                  className={`${styles.cnt_block} equal-hight`}
                  style={{ height: "349px" }}
                >
                  <figure>
                    <Image
                      src={i.img}
                      alt="team member"
                      width={100}
                      height={100}
                    />
                  </figure>
                  <h3>
                    <Link href="/about">{i.name}</Link>
                  </h3>
                  <p>{t("about:freelancer")}</p>
                  <ul className={`${styles.follow_us} clearfix px-0`}>
                    <li key={8}>
                      <Link href="/about">
                        <Facebook />
                      </Link>
                    </li>
                    <li key={9}>
                      <Link href="/about">
                        <Twitter />
                      </Link>
                    </li>
                    <li key={10}>
                      <Link href="/about">
                        <Linkedin />
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.section}>
        <div className="container-fluid">
          <h2 className={`${styles.section_title} mb-2 h1 text-primary`}>
            {t("about:what_we_do")}
          </h2>
          <p className="text-center text-muted h5">{t("common:lorem20")}</p>
          <div className="row mt-5">
            {aboutIcons.map((i, index) => {
              const Icon = i;
              return (
                <div
                  key={index}
                  className={`col-12 col-sm-${
                    (index + 1) % 3 === 0 ? 12 : 6
                  } col-md-4`}
                >
                  <div
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className={`card ${styles.card} border`}
                  >
                    <div className={`row ${styles.card_block}`}>
                      <div className="col-auto">
                        <Icon
                          icon={i.icon}
                          className="text-primary display-4"
                        />
                      </div>
                      <div className="col d-flex flex-column">
                        <h3>{t("about:special_title")}</h3>
                        <p>{t("common:lorem20")}</p>
                        <Link
                          href="/about"
                          title="Read more"
                          className="read-more"
                        >
                          {t("about:read_more")}
                          {locale === "ar" ? (
                            <ChevronDoubleLeft />
                          ) : (
                            <ChevronDoubleRight />
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
}
