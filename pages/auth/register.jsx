import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Check, InfoCircle, X } from "react-bootstrap-icons";
import styles from "@/styles/Auth.module.css";
import axios, { axiosApi } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/mainSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation("auth");
  const [loading, setloading] = useState(false);

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const user = username;
      const pwd = password;
      const response = await axiosApi.post("/auth/register", {
        user,
        pwd,
      });
      //clear state and controlled inputs
      setUsername("");
      setPassword("");
      setMatchPwd("");
      if (response.status === 201) {
        await axiosApi
          .post("/auth/signin", {
            user,
            pwd,
          })
          .then((res) => {
            dispatch(setUser(res.data));
            push("/");
          });
      }
    } catch (err) {
      if (!err?.response) {
        toast(t("auth:no_server_res"));
        setErrMsg(t("auth:no_server_res"));
      } else if (err.response?.status === 409) {
        toast(t("auth:username_taken"));
        setErrMsg(t("auth:username_taken"));
      } else if (err.response?.message) {
        toast(err.response.message);
        setErrMsg(err.response.message);
      } else {
        toast(t("auth:reg_failed"));
        setErrMsg(t("auth:reg_failed"));
      }
      errRef.current.focus();
    } finally {
      setloading(false);
    }
  };

  const headData = {
    title: `${t("common:brand")} | ${t("auth:sign_up")}`,
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
            <h1>{t("auth:sign_up")}</h1>
            <p
              className={errMsg ? styles.errmsg : styles.offscreen}
              ref={errRef}
              aria-live="assertive"
            >
              <InfoCircle className="mx-2" />
              {errMsg}
            </p>
            <Form onSubmit={handleSubmit}>
              {/* -------------------- username / user input field -------------------- */}
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>
                  {t("auth:username")}
                  <Check
                    className={validName ? "text-success mx-2" : "d-none"}
                  />
                  <X
                    className={
                      validName || !username ? "d-none" : "text-danger mx-2"
                    }
                  />
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("auth:username_placeholder")}
                  autoComplete="off"
                  ref={userRef}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validName
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <InfoCircle />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </Form.Group>

              {/* -------------------- password / pwd input field--------------------  */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  {t("auth:password")}
                  <Check
                    className={validPwd ? "text-success mx-2" : "d-none"}
                  />
                  <X
                    className={
                      validPwd || !password ? "d-none" : "text-danger mx-2"
                    }
                  />
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder={t("auth:password_placeholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <InfoCircle />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Form.Group>

              {/* -------------------- matching password / matchpwd input field -------------------- */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  {t("auth:password")}
                  <Check
                    className={
                      validMatch && matchPwd ? "text-success mx-2" : "d-none"
                    }
                  />
                  <X
                    className={
                      validMatch || !matchPwd ? "d-none" : "text-danger mx-2"
                    }
                  />
                </Form.Label>
                <Form.Control
                  type="password"
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  placeholder={t("auth:password_placeholder")}
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <InfoCircle />
                  Must match the first password input field.
                </p>
              </Form.Group>
              {loading ? (
                <Button disabled>
                  <div className="d-flex align-items-center">
                    <Spinner
                      className="me-2"
                      animation="border"
                      variant="light"
                      size="sm"
                    />
                    {"  "}
                    {t("auth:loadig")}
                  </div>
                </Button>
              ) : (
                <Button onClick={(e) => handleSubmit(e)} type="submit">
                  {t("auth:sign_up")}
                </Button>
              )}
            </Form>
            <p className="my-2">
              {t("auth:have_acc")}
              <Link href="/auth/signin" className="fw-bold text-primary px-2">
                {t("auth:login")}
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  };
}
