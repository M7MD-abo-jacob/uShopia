import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import { BagDash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { cart, removeFromCart } from "@/redux/cartSlice";
import rejectAction from "@/lib/rejectAction";

const RemoveFromCartBtn = ({ product }) => {
  const { t } = useTranslation("product");
  const dispatch = useDispatch();
  const Cart = useSelector(cart);

  const handleRemove = () => {
    let i = Cart.findIndex((object) => {
      return object.id === product.id;
    });
    if (i > -1) {
      dispatch(removeFromCart({ id: product.id }));
    } else {
      rejectAction();
    }
  };

  return (
    <Button
      className="d-flex align-items-center"
      variant="danger"
      onClick={() => {
        handleRemove();
      }}
    >
      <BagDash className="fs-1" />
      <div>{t("remove_from_cart")}</div>
    </Button>
  );
};

export default RemoveFromCartBtn;
