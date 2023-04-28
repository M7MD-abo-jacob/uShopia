import { Col, Container, Row } from "react-bootstrap";
import FilterModal from "@/components/filters/FilterModal";
import FiltersMenu from "@/components/filters/FiltersMenu";

const ProductsLayout = ({ children, Filters }) => {
  return (
    <Container id="shop" className="mt-3">
      <div
        className="position-fixed mb-3 mb-lg-5"
        style={{
          bottom: "0",
          left: "10%",
          zIndex: "1000",
          // height: "",
        }}
      >
        <FilterModal Filters={Filters} />
      </div>
      <Row className="d-flex justify-content-end">
        <Col xs={12} lg={3} className="d-none d-lg-block">
          <div
            className="position-sticky"
            style={{
              top: "4rem",
              zIndex: "1000",
              height: "calc(100vh - 4rem)",
            }}
          >
            <FiltersMenu Filters={Filters} />
          </div>
        </Col>
        {children}
      </Row>
    </Container>
  );
};

export default ProductsLayout;
