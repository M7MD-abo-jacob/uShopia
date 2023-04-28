import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Auth.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/mainSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "auth"]);
  const { push } = useRouter();
  const [loading, setloading] = useState(false);
  let [username, setUsername] = useState("anyuser");
  let [password, setPassword] = useState("Any$12345");
  const errRef = useRef();

  const userRef = useRef();
  const [err, setErr] = useState(null);

  const signin = async () => {
    setloading(true);
    const user = username;
    const pwd = password;
    try {
      const res = await axios.post("/api/auth/signin", {
        user,
        pwd,
      });
      dispatch(setUser(res.data));

      push("/");
    } catch (err) {
      if (!err?.response) {
        toast("No Server Response");
        setErr("No Server Response");
      } else if (err.response.status === 400) {
        toast("Missing Username or Password");
        setErr("Missing Username or Password");
      } else if (err.response.status === 401) {
        toast("Unauthorized");
        setErr("Unauthorized");
      } else {
        toast("Login Failed");
        setErr("Login Failed");
      }
      errRef.current.focus();
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    setErr("");
  }, [username, password]);

  const headData = {
    title: `${t("common:brand")} | ${t("auth:login")}`,
    description: `${t("common:lorem20")}`,
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
      </Head>
      <Container className="p-3 my-5 overflow-hidden">
        <Row>
          <Col col={10} md={6} className="mb-3 position-relative">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              fill
              alt="log in"
            />
          </Col>

          <Col col={4} md={6}>
            <h1>{t("auth:login")}</h1>
            <p
              ref={errRef}
              className={err ? styles.errmsg : styles.offscreen}
              aria-live="assertive"
            >
              <InfoCircle className="mx-2" />
              {err}
            </p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              {/* -------------------- username / user input field -------------------- */}
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>{t("auth:username")}</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={userRef}
                  placeholder={t("auth:username_placeholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              {/* -------------------- password / pwd input field--------------------  */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t("auth:password")}</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder={t("auth:password_placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {loading ? (
                <Button variant="primary" type="submit" disabled={true}>
                  <div className="d-flex align-items-center">
                    <Spinner
                      className="me-2"
                      animation="border"
                      variant="light"
                      size="sm"
                    />
                    {t("auth:loadig")}
                  </div>
                </Button>
              ) : (
                //  session ? (
                //   <Button disabled>{t("login")}</Button>
                // ) :
                <Button variant="primary" type="submit">
                  {t("auth:login")}
                </Button>
              )}
            </Form>
            <p className="my-2">
              {t("auth:dont_have_acc")}
              <Link href="/auth/register" className="fw-bold text-primary px-2">
                {t("auth:sign_up")}
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}
