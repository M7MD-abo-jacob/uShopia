import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BagHeartFill, Cart3, Search } from "react-bootstrap-icons";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Navbar,
} from "react-bootstrap";
import { mainSelector, setCartIsOpen } from "@/redux/mainSlice";
import { cart } from "@/redux/cartSlice";
import CartComponent from "@/components/cart/CartComponent";
import NavigationLg from "@/components/header/NavigationLG";
import OffcanvasComponent from "@/components/header/Offcanvas";
import { useRefreshToken } from "@/lib/hooks/useRefreshToken";

const NavBar = () => {
  const refreshToken = useRefreshToken();
  const { user } = useSelector(mainSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { push, replace, locale } = useRouter();

  const Cart = useSelector(cart);
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <Navbar
        dir="ltr"
        id="navbar"
        collapseOnSelect
        key="md"
        bg="primary"
        expand={false}
        variant="dark"
        expanded={expanded}
        sticky="top"
        className="navbar py-0 mb-0 shadow text-light"
      >
        <Container>
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center"
          >
            <Navbar.Brand>
              <Link href="/" className="navbar-brand d-flex align-items-center">
                <BagHeartFill className="h1 mb-0 me-2" />
                <h2 className="h2 header-t mb-0">{t("brand")}</h2>
              </Link>
            </Navbar.Brand>
            <Form
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="d-none w-50 d-lg-flex"
              onSubmit={(e) => {
                e.preventDefault();

                pathname === "/products"
                  ? replace(`/products?q=${searchValue}`)
                  : push(`/products?q=${searchValue}`);
              }}
            >
              <FormGroup className="w-100 position-relative">
                <Form.Control
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="me-2"
                  aria-label="text"
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
                  onClick={() => push("/products")}
                >
                  <Search className="fs-4" />
                </Button>
              </FormGroup>
            </Form>
            <div>
              {user ? (
                <Button
                  variant="link"
                  className="position-relative text-white"
                  onClick={() => {
                    dispatch(setCartIsOpen(true));
                  }}
                >
                  <Cart3 className="h3 mb-0" />
                  {Cart.length > 0 && (
                    <span
                      className={`position-absolute ${
                        locale === "ar" ? "start-0" : "end-100"
                      } translate-middle badge rounded bg-danger`}
                      style={{ top: "10%", left: "80%" }}
                    >
                      {Cart.length}
                      <span className="visually-hidden">
                        {t("cart_items_count")}
                      </span>
                    </span>
                  )}
                </Button>
              ) : (
                <Link href="/auth/signin" className="btn btn-light">
                  {t("login")}
                </Link>
              )}
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-md`}
                className="fw-bolder"
                style={{ border: "none", fontSize: "1.6rem" }}
                onClick={() => setExpanded(true)}
              />
            </div>
          </Col>
          <OffcanvasComponent setExpanded={setExpanded} />
        </Container>
        <CartComponent />
      </Navbar>
      <NavigationLg />
    </>
  );
};

export default NavBar;
