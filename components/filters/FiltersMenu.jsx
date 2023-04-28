import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import {
  Search,
  SortAlphaDown,
  SortAlphaUp,
  SortDownAlt,
  SortUpAlt,
  StarFill,
} from "react-bootstrap-icons";

const FiltersMenu = ({ handleClose = null, Filters }) => {
  const { t } = useTranslation(["common", "products"]);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <h3 className="d-none fw-bolder d-lg-block mb-3">
        {t("products:filter_and_sort")}
      </h3>
      <Row
        className="align-items-center d-flex justify-content-center mb-lg-4"
        dir={router.locale === "ar" ? "rtl" : "ltr"}
      >
        {/* -------------------- search -------------------- */}
        <Col xs={12} className="align-self-center">
          <Form
            className="d-flex d-lg-none mb-3 align-self-center position-relative"
            onSubmit={(e) => {
              e.preventDefault();
              router.query.q = searchValue.trim();
              router.replace(router);
              handleClose();
            }}
          >
            <Form.Control
              type="text"
              placeholder={t("common:search_placeholder")}
              className="me-2 border-primary"
              aria-label="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />

            <Button
              type="submit"
              variant="link"
              style={{ color: "gray" }}
              className={`position-absolute top-0 ${
                router.locale === "en" ? "end-0" : "start-0"
              }`}
              onClick={(e) => {
                e.preventDefault();
                router.query.q = searchValue.trim();
                router.replace(router);
                handleClose();
              }}
            >
              <Search className="fs-4" />
            </Button>
          </Form>
        </Col>
        {/* -------------------- category -------------------- */}
        <Col xs={12} md={6} lg={12}>
          <Form.Group className="mb-2 position-relatitve">
            {t("products:category")}
            <DropdownButton
              variant="outline-primary"
              className="d-inline mx-3 position-absolute"
              id="dropdown-basic-button"
              title={Filters?.category}
            >
              <Dropdown.Item
                onClick={() => {
                  router.query.category = "all";
                  router.replace(router);
                }}
              >
                {/* TODO: translate all */}
                all
              </Dropdown.Item>
              {Filters.categories.map((obj, index, list) => (
                <Dropdown.Item
                  key={index}
                  onClick={(obj) => {
                    router.query.category = list[index];
                    router.replace(router);
                  }}
                >
                  {obj}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={12} className="mt-2">
          {/* -------------------- by rating -------------------- */}
          <Form.Label>
            {t("products:rating")}
            {[...Array(5).keys()].map((index, i) => {
              return (
                <span
                  role="button"
                  className="p-2"
                  key={index}
                  onClick={(index) => {
                    router.query.rated = i + 1;
                    router.replace(router);
                  }}
                >
                  <StarFill
                    fontSize="15px"
                    className={
                      Filters?.withRating > i ? "text-primary" : "text-muted"
                    }
                  />
                </span>
              );
            })}
          </Form.Label>
        </Col>
      </Row>
      {/*  -------------------- sort -------------------- */}
      <Form dir={router.locale === "ar" ? "rtl" : "ltr"}>
        <h4>{t("products:sort")}</h4>
        <Row>
          <ToggleButton
            type="radio"
            variant="outline-primary"
            name="sort"
            id="n-asc"
            value={`${Filters?.sortByName === "a"}`}
            checked={Filters?.sortByName === "a"}
            onChange={() => {
              router.query.sorted = "nameAsc";
              router.replace(router);
            }}
          >
            <SortAlphaDown className="fs-3" /> {t("products:by_name_a")}
          </ToggleButton>
          {/*  -------------------- by name des -------------------- */}
          <ToggleButton
            type="radio"
            variant="outline-primary"
            name="sort"
            id="n-des"
            value={`${Filters?.sortByName === "d"}`}
            checked={Filters?.sortByName === "d"}
            onChange={() => {
              router.query.sorted = "nameDes";
              router.replace(router);
            }}
          >
            <SortAlphaUp className="fs-3" /> {t("products:by_name_d")}
          </ToggleButton>
          {/*  -------------------- by price asc -------------------- */}
          <ToggleButton
            type="radio"
            variant="outline-primary"
            name="sort"
            id="p-asc"
            value={`${Filters?.sortByPrice === "a"}`}
            checked={Filters?.sortByPrice === "a"}
            onChange={() => {
              router.query.sorted = "priceAsc";
              router.replace(router);
            }}
          >
            <SortDownAlt className="fs-3" /> {t("products:by_price_a")}
          </ToggleButton>
          {/*  -------------------- by price des -------------------- */}
          <ToggleButton
            type="radio"
            variant="outline-primary"
            name="sort"
            id="p-des"
            value={`${Filters?.sortByPrice === "d"}`}
            checked={Filters?.sortByPrice === "d"}
            onChange={() => {
              router.query.sorted = "priceDes";
              router.replace(router);
            }}
          >
            <SortUpAlt className="fs-3" /> {t("products:by_price_d")}
          </ToggleButton>
        </Row>
      </Form>
      {/* -------------------- reset filters -------------------- */}
      <Button
        variant="outline-primary"
        onClick={() => {
          router.replace("/products");
        }}
        className="mt-2"
      >
        {t("products:reset_filters")}
      </Button>
    </>
  );
};

export default FiltersMenu;
