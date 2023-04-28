import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { clearAll, setCartItems } from "@/redux/cartSlice";
import { mainSelector, setCartIsOpen } from "@/redux/mainSlice";
import { cart } from "@/redux/cartSlice";
import CartItem from "@/components/cart/CartItem";
import store from "@/redux/store";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorageActions";

const CartComponent = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const Cart = useSelector(cart);
  const { cartIsOpen } = useSelector(mainSelector);
  const dispatch = useDispatch();

  let prices = Cart.reduce((accumulator, object) => {
    return accumulator + object.price * object.count;
  }, 0).toFixed(2);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      await handlePayment();
      dispatch(clearAll());
    } catch (error) {
      console.log("error:  ", error);
      if (error.response?.status === 403) {
        toast.error(t("common:use_vpn"));
      } else {
        toast.error(error.message);
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    const cartData = getLocalStorage("cart");
    if (cartData) {
      dispatch(setCartItems(JSON.parse(cartData)));
    }
  }, []);

  useEffect(() => {
    setLocalStorage("cart", JSON.stringify(Cart));
  }, [Cart]);

  return (
    <div
      id="cart-container"
      className={`cart-container ${cartIsOpen ? "show" : "hide-cart"}`}
    >
      <Col
        className="cart-bg"
        onClick={() => {
          dispatch(setCartIsOpen(false));
        }}
      ></Col>
      <div
        className={`rounded cart col ${cartIsOpen ? "show-cart" : "hide-cart"}`}
      >
        <Card
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="card mb-1 text-dark"
        >
          {/* -------------------- cart header -------------------- */}
          <CardHeader
            dir="ltr"
            className="shadow position-sticky top-0 py-3 row justify-content-between align-items-center bg-primary text-light"
          >
            <h5 className="mb-0 col-auto fw-bold">
              {t("cart")} - {Cart.length} {t("cart_items")}
            </h5>
            <Button
              className="btn-close col-1 px-2"
              onClick={() => {
                dispatch(setCartIsOpen(false));
              }}
            ></Button>
          </CardHeader>
          {/* -------------------- cart body -------------------- */}
          {Cart.length === 0 ? (
            <div className="card-body px-1 fw-bold">{t("cart_empty")}</div>
          ) : (
            <>
              <div className="card-body px-1">
                {Cart.length > 0 &&
                  Cart.map((cartItem) => (
                    <CartItem key={cartItem.id} product={cartItem} />
                  ))}
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  className="w-75 mb-4"
                  onClick={() => dispatch(clearAll())}
                >
                  {t("clear_all")}
                </Button>
              </div>
            </>
          )}
        </Card>
        {/* -------------------- cart summary -------------------- */}

        {Cart.length > 0 && (
          <div className="col">
            <Card
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="card mb-4 text-dark"
            >
              <CardHeader className="py-3">
                <h5 className="mb-0 fw-bold">{t("summary")}</h5>
              </CardHeader>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {t("summary_products")}
                    <span>${prices}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>{t("summary_shipping")}</span>
                    <span>0</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>{t("summary_total")}</strong>
                    </div>
                    <span>
                      <strong>${prices}</strong>
                    </span>
                  </li>
                </ul>
                {checkoutLoading ? (
                  <Button size="lg" disabled>
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => {
                      handleCheckout();
                    }}
                  >
                    {t("checkout")}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;

async function handlePayment() {
  const stripePromise = loadStripe(
    "pk_test_51Mw3a3LsGFCylMCgAqZpBEVc7yvEmW2H2b2tEvZhWepTOYpxFI0qQEQnAjhDD0GHKvmGObgDmXpSUjpWrJCWMPPS00fHJ6o6RA"
  );
  const products = store.getState().cart;
  // try {
  const stripe = await stripePromise;
  const { data } = await axios.post("/api/checkout", {
    products,
  });
  await stripe.redirectToCheckout({
    sessionId: data.stripeSession.id,
  });
  toast.success("payment successfull!");
}
