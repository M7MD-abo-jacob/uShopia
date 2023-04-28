import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { Funnel } from "react-bootstrap-icons";
import FiltersMenu from "@/components/filters/FiltersMenu";

const FilterModal = ({ Filters }) => {
  const { t } = useTranslation("products");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="success"
        className="d-block d-lg-none border-dark border border-2 d-flex align-items-center"
        style={{
          bottom: "0",
          left: "10%",
          zIndex: "1000",
        }}
      >
        <Funnel className={`fs-1 display-1 fw-bolder mx-1`} />
        {t("filters")}
      </Button>

      <Modal show={show} onHide={handleClose} className="py-4">
        <Modal.Header className="bg-primary text-light">
          <Modal.Title className="h2 mb-0 fw-bold">
            {t("filter_and_sort")}
          </Modal.Title>
          <CloseButton onClick={handleClose} className="m-0" />
        </Modal.Header>
        <Modal.Body className="border border-primary rounded-bottom">
          <FiltersMenu handleClose={handleClose} Filters={Filters} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterModal;
