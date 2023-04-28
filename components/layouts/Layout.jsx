import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import Announcements from "@/components/header/Announcements";
import ScrollToTopBtn from "@/components/buttons/ScrollToTopBtn";

const Layout = ({ children }) => {
  const { locale } = useRouter();

  return (
    <>
      <Announcements />
      <NavBar />
      <main>{children}</main>
      <Footer />
      <ScrollToTopBtn />
      <ToastContainer />
      <style jsx global>{`
        #__next {
          direction: ${locale === "ar" ? "rtl" : "ltr"};
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Layout;
