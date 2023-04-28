import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

const Hero = ({ title, subtitle, img }) => {
  return (
    <Container fluid className="page-top text-center mb-2">
      <Container>
        <Row className="align-items-center position-relative">
          <Col xs={4} className="page-top-text">
            <h1 className={`fw-bold mb-2`}>{title}</h1>
            <h3> {subtitle} </h3>
          </Col>
          <Col md={8}>
            <Image
              priority
              style={{ objectFit: "contain" }}
              className="w-75"
              src={img}
              width="75%"
              height="100%"
              layout="responsive"
              alt="nothig of importance"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
