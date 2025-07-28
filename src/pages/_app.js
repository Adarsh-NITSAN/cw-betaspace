import { useEffect } from "react";
import TagManager from "react-gtm-module";
import Layout from "../components/Layout";
import AOS from "aos";
import { GlobalProvider } from "../context/GlobalContext";
import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";
import "../assets/fonts/typography-font/lato-regular-webfont.ttf";
import "../assets/fonts/typography-font/lato-italic-webfont.ttf";
import "../assets/fonts/typography-font/lato-semibold-webfont.ttf";
import "../assets/fonts/typography-font/lato-medium-webfont.ttf";
import "../assets/fonts/typography-font/lato-bold-webfont.ttf";
import "../scss/main.scss";
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps, router }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      useClassNames: true,
      initClassName: false,
    });
    TagManager.initialize({ gtmId: "GTM-MFTBM4J" });
  }, []);

  return (
    <GlobalProvider>
      <Layout pageContext={{}} pageData={pageProps.pageData}>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
};

export default appWithTranslation(MyApp);
// export default MyApp;
