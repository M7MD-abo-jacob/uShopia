import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import { BagPlus } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { mainSelector } from "@/redux/mainSlice";

const AddToCartBtn = ({ product }) => {
  const { user } = useSelector(mainSelector);
  const { t } = useTranslation("common", "product");
  const dispatch = useDispatch();

  return (
    <Button
      className="d-flex align-items-center"
      onClick={() => {
        if (user) {
          dispatch(addToCart({ ...product, count: 1 }));
        } else {
          toast(t("common:not_signed"));
        }
      }}
    >
      <BagPlus className="fs-1 mx-1" />
      <div>{t("product:add_to_cart")}</div>
    </Button>
  );
};

export default AddToCartBtn;
