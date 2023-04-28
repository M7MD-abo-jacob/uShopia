import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";
import Layout from "@/components/layouts/Layout";
import store from "@/redux/store";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <SSRProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
