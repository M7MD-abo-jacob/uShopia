import {
  BagHeart,
  BagPlus,
  CartCheck,
  CheckLg,
  HandThumbsUp,
  InfoCircle,
  Lightbulb,
  Lightning,
  Megaphone,
  PersonBadge,
} from "react-bootstrap-icons";

export const languages = [
  {
    code: "en",
    country_name: "english",
    country_code: "gb",
  },
  {
    code: "ar",
    country_name: "العربية",
    country_code: "sa",
    dir: "rtl",
  },
];
export const pages = {
  about: { title: "about_title", subtitle: "about_sub", img: "about" },
  customer: {
    title: "customer_title",
    subtitle: "support_subtitle",
    img: "support",
  },
  error: { title: "err_title", subtitle: "err_subtitle", img: "error" },
  home: { title: "brand", subtitle: "brand_subtitle", img: "landing" },
  product: { title: "product_title", subtitle: "product_sub", img: "" },
  shop: { title: "shop_title", subtitle: "shop_sub", img: "" },
};

export const aboutIcons = [
  Lightning,
  Lightbulb,
  CheckLg,
  HandThumbsUp,
  Megaphone,
  CartCheck,
];

export const aboutPeople = [
  {
    name: "WEB CODER SKULL",
    img: "/assets/team1.png",
  },
  {
    name: "Kappua",
    img: "/assets/team2.png",
  },
  {
    name: "MANISH",
    img: "/assets/team3.png",
  },
  {
    name: "ATUL",
    img: "/assets/team4.png",
  },
];

export const links = [
  { name: "home", link: "/", icon: BagHeart },
  { name: "shop", link: "/products", icon: BagPlus },
  { name: "about_us", link: "/about", icon: InfoCircle },
  {
    name: "customer_service",
    link: "/support",
    icon: PersonBadge,
  },
];

export const sliderItems = [
  {
    id: 1,
    img: "https://i.ibb.co/XsdmR2c/1.png",
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
  },
  {
    id: 2,
    img: "https://i.ibb.co/DG69bQ4/2.png",
    title: "AUTUMN COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fcf1ed",
  },
  {
    id: 3,
    img: "https://i.ibb.co/cXFnLLV/3.png",
    title: "LOUNGEWEAR LOVE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fbf0f4",
  },
];

export const colors = [
  "goldenish",
  "orange",
  "redish",
  "pinkish",
  "purpleish",
  "blueish",
  "greenish",
];
