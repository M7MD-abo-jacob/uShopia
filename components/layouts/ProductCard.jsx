import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { BagDash, BagPlus, StarFill } from "react-bootstrap-icons";
import { mainSelector } from "@/redux/mainSlice";
import { addToCart, cart, removeFromCart } from "@/redux/cartSlice";

const ProductCard = ({ item }) => {
  const { t } = useTranslation();
  const { user } = useSelector(mainSelector);
  const Cart = useSelector(cart);
  const dispatch = useDispatch();

  return (
    <Link
      className="product-card col-12 col-sm-6 col-md-4 col-xl-3 mb-2"
      href={`/products/${item.id}`}
    >
      <div className="card p-0 cursor-pointer bg-gradient border-primary">
        <div className="position-relative w-50 h-50 mx-auto">
          <Image
            loading="lazy"
            src={item.image}
            alt={item.title}
            style={{ objectFit: "contain" }}
            width={500}
            height={500}
            className="card-img-top"
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between align-content-end px-1 py-0">
          <div className="card-footer p-2">
            <h4 className="card-title mb-1 p-1 ">{item.title}</h4>
            {/* -------------------- star rating -------------------- */}
            <div className="d-flex align-items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="cursor-pointer mb-2">
                  {
                    <StarFill
                      className={`${
                        Math.round(item.rating.rate) > i
                          ? "text-primary"
                          : "text-muted"
                      }`}
                      fontSize="15px"
                    />
                  }
                </span>
              ))}
              <span className="mx-3">({item.rating.rate})</span>
            </div>
            {/* -------------------- price and cart btns -------------------- */}
            <div className="d-flex flex-sm-row justify-content-between align-items-center px-1">
              {/* -------------------- price -------------------- */}
              <p className="price text-center d-block mb-1 text-primary">
                <span className="fs-3">
                  {"$" + item.price.toString().split(".")[0]}
                </span>
                {"."}
                <span className="fs-5">
                  {item.price.toFixed(2).toString().split(".")[1]}
                </span>
              </p>
              {/* -------------------- add/remove btn -------------------- */}
              {user && Cart.findIndex((prod) => prod.id === item.id) > -1 ? (
                <Button
                  variant="danger"
                  className="px-3 py-1 d-block align-self-stretch bg-gradient rounded-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(removeFromCart(item));
                  }}
                >
                  <BagDash className="fs-4" />
                </Button>
              ) : (
                <Button
                  className="px-3 py-1 d-block align-self-stretch bg-gradient rounded-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (user) {
                      dispatch(addToCart({ ...item, count: 1 }));
                    } else {
                      toast(t("not_signed"));
                    }
                  }}
                >
                  <BagPlus className="fs-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
