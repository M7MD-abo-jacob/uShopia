import {
  Row,
  Button,
  CloseButton,
  Dropdown,
  Form,
  FormGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import {
  BagHeartFill,
  DoorOpen,
  GeoAlt,
  Palette,
  Search,
  Translate,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import NavigationSM from "@/components/header/NavigationSM";
import { languages } from "@/data/data";
import axios, { axiosApi } from "@/lib/axios";
import { mainSelector, setUser } from "@/redux/mainSlice";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const OffcanvasComponent = ({ setExpanded }) => {
  const dispatch = useDispatch();
  const axiosAuth = useAxiosAuth();
  const { user } = useSelector(mainSelector);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const { locale, push, reload, replace, pathname, query, asPath } =
    useRouter();

  const [darkChecked, setDarkChecked] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDarkChecked(window.__theme == "dark");
    }
  }, []);

  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-md`}
      aria-labelledby={`offcanvasNavbarLabel-expand-md`}
      placement="end"
      className="rounded overflow-scroll"
      onHide={() => setExpanded(false)}
    >
      <Offcanvas.Header
        className="rounded shadow position-sticky pe-3 top-0 bg-primary mb-2 text-light"
        onClick={() => setExpanded(false)}
      >
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
          <Nav.Item
            // href="/"
            className="navbar-brand d-flex align-items-center"
          >
            <BagHeartFill className="h1 mb-0 me-2" />
            <h2 className="h2 header-t mb-0">{t("brand")}</h2>
          </Nav.Item>
        </Offcanvas.Title>
        <CloseButton onClick={() => setExpanded(false)} />
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <Nav
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="justify-content-end flex-grow-1 pe-3"
        >
          {/* -------------------- personal info if logged in -------------------- */}
          {user ? (
            <>
              <div className="d-flex align-items-center">
                <img
                  style={{ width: "35%" }}
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="me"
                />
                <div>
                  <h2 className="fs-3 fw-bold">{user.username}</h2>
                  <h3 className="fs-6">@ {user.username}</h3>
                  <div className="fs-6">
                    <GeoAlt /> Damascus
                  </div>
                </div>
              </div>
              <hr className="mb-3" />
            </>
          ) : (
            <Row className="justify-content-around">
              <Link
                onClick={() => setExpanded(false)}
                href="/auth/signin"
                className="btn btn-primary col-5"
              >
                {t("login")}
              </Link>
              <Link
                onClick={() => setExpanded(false)}
                href="/auth/register"
                className="btn btn-primary col-5"
              >
                {t("sign_up")}
              </Link>
            </Row>
          )}
          {/* -------------------- search on small scrn -------------------- */}
          <Form
            className="d-flex d-lg-none my-3"
            onSubmit={(e) => {
              e.preventDefault();
              setExpanded(false);
              pathname === "/products"
                ? replace(`/products?q=${searchValue}`)
                : push(`/products?q=${searchValue}`);
            }}
          >
            <FormGroup className="position-relative w-100">
              <Form.Control
                type="text"
                placeholder={t("search_placeholder")}
                className=""
                aria-label="Search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <Button
                variant="link"
                style={{ color: "gray" }}
                className={`position-absolute top-0 ${
                  locale === "ar" ? "start-0" : "end-0"
                }`}
                onClick={() => {
                  setExpanded(false);
                  push("/products");
                }}
              >
                <Search className="fs-4" />
              </Button>
            </FormGroup>
          </Form>
          {/*  -------------------- nav links -------------------- */}
          <NavigationSM setExpanded={setExpanded} />
          {/* -------------------- dark theme -------------------- */}
          <Nav.Item>
            <Form>
              <Form.Group className="cursor-pointer d-flex w-100 align-items-center">
                <Form.Label
                  role="button"
                  htmlFor="custom-switch"
                  className="d-flex align-items-center w-100 m-0 py-2"
                >
                  <Palette />
                  <h2 className="mx-3 mb-0">{t("dark_theme")}</h2>
                </Form.Label>
                <Form.Check
                  role="button"
                  type="switch"
                  id="custom-switch"
                  checked={darkChecked}
                  onChange={() => {
                    setDarkChecked((prev) => !prev);
                    const newTheme =
                      window.__theme === "dark" ? "light" : "dark";
                    window.__setPreferredTheme(newTheme);
                  }}
                  className="fs-4"
                />
              </Form.Group>
            </Form>
          </Nav.Item>
          {/* -------------------- language -------------------- */}
          <Nav.Item>
            <Dropdown>
              <Dropdown.Toggle
                variant="text"
                className="w-100 py-2 px-0  d-flex justify-content-start align-items-center"
              >
                <Translate />
                <h2 className="h2 mx-3 mb-0">{t("language")}</h2>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  outline: "none !important",
                  border: "none !important",
                }}
                className="text-start lng-dropdown"
              >
                {languages.map(({ code, country_name, country_code }) => (
                  <Dropdown.Item className="h5 mb-0" key={country_code}>
                    <Button
                      variant="text"
                      className="w-100"
                      disabled={code === locale}
                      onClick={() => {
                        replace({ pathname, query }, asPath, {
                          locale: code,
                        });
                      }}
                    >
                      <span
                        className={`flag-icon flag-icon-${country_code} mx-2`}
                      ></span>
                      {country_name}
                    </Button>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
          {/* -------------------- log out -------------------- */}
          {user && (
            <Nav.Item
              role="button"
              onClick={async () => {
                setExpanded(false);
                try {
                  const { data } = await axiosApi.get("/auth/logout");
                  toast(data);
                  dispatch(setUser({}));
                  reload();
                } catch (error) {
                  toast(error.message);
                  console.log(error);
                }
              }}
              className="py-2 d-flex w-100"
            >
              <DoorOpen />
              <h2 className="mx-3 mb-0">{t("log_out")}</h2>
            </Nav.Item>
          )}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

export default OffcanvasComponent;
