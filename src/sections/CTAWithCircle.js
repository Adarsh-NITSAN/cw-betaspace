import { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import ReactMarkdown from "react-markdown";
import Button from "../components/Core/Button";
import SecondaryButton from "../components/Shared/SecondaryButton";
import GlobalContext from "../context/GlobalContext";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useTranslation } from "../pages/i18n/client";
import { useTranslation } from "../components/i18n/client";

const CTAWithCircle = ({ id, contactVariant, data }) => {
  const { width } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation(router.locale);

  // Helper function to extract link URL from btnlink object
  const getLinkUrl = (btnlink) => {
    if (!btnlink) return null;
    // Handle both old and new database structures
    if (typeof btnlink === 'string') return btnlink;
    if (btnlink.href) return btnlink.href;
    if (btnlink.linkText) return btnlink.linkText;
    return null;
  };

  // Helper function to check if link should open in new tab
  const shouldOpenInNewTab = (linkUrl) => {
    if (!linkUrl) return false;
    return linkUrl.includes('https://') || linkUrl.includes('http://') || linkUrl.includes('fileadmin');
  };

  // Helper function to check if link is external domain
  const isExternalDomain = (linkUrl) => {
    if (!linkUrl) return false;
    if (linkUrl.includes('fileadmin')) {
      return !(linkUrl.includes('https://') || linkUrl.includes('http://'));
    }
    return false;
  };

  return (
    <section
      id={`c${id}`}
      className={`cta-circle-section ${contactVariant ? "contact-variant" : "not-contact-variant"
        }`}
    >
      <span className="circle" data-aos="fade"></span>
      <div className="container">
        <div className="cta-circle-wrapper">
          <div className="headline-wrapper">
            <div className="icon-in desktop-visible" data-aos="fade-right">
              {data.image && data.image.length ? (
                <LazyLoadImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                  afterLoad={AOSRefresh}
                  alt={t("data.icon")}
                />
              ) : (
                ""
              )}
            </div>
            {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
          </div>
          <div className="content-wrapper">
            <div className="content">
              {!contactVariant && width < 768 && (
                <span data-aos="fade-right" className="icon-in">
                  {data.image && data.image.length ? (
                    <LazyLoadImage
                      src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                      afterLoad={AOSRefresh}
                      alt={t("data.office")}
                    />
                  ) : (
                    ""
                  )}
                </span>
              )}
              <div data-aos="fade-up">
                {data.text && (
                  <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }} />
                )}
              </div>
              {contactVariant && data.phone ? (
                <Link
                  data-aos="fade-up"
                  href={`tel:${data.phone}`}
                  className="tel-no"
                >
                  {data.phone}
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="btn-wrapper" data-aos="fade-up">

              {width < 768 && contactVariant ? (
                <>
                  {
                    data.list && data.list.length ? (
                      <>
                        {data.list[0].btnlink && data.list[0].btntext && (
                          <SecondaryButton
                            targetBlank={shouldOpenInNewTab(getLinkUrl(data.list[0].btnlink))}
                            diffDomain={isExternalDomain(getLinkUrl(data.list[0].btnlink))}
                            link={getLinkUrl(data.list[0].btnlink)}>
                            {data.list[0].btntext}
                          </SecondaryButton>
                        )}
                      </>
                    ) : ("")
                  }
                </>
              ) : (
                <>
                  {
                    data.list && data.list.length ? (
                      <>
                        {data.list[0].btntext && (
                          <Button
                            targetBlank={shouldOpenInNewTab(getLinkUrl(data.list[0].btnlink))}
                            diffDomain={isExternalDomain(getLinkUrl(data.list[0].btnlink))}
                            link={getLinkUrl(data.list[0].btnlink)}>
                            {data.list[0].btntext}
                          </Button>
                        )}
                      </>
                    ) : ("")
                  }
                </>
              )}
              {
                data.list && data.list.length && data.list[1] ? (
                  <>
                    {data.list[1].btnlink && data.list[1].btntext && (
                      <SecondaryButton
                        targetBlank={shouldOpenInNewTab(getLinkUrl(data.list[1].btnlink))}
                        diffDomain={isExternalDomain(getLinkUrl(data.list[1].btnlink))}
                        link={getLinkUrl(data.list[1].btnlink)}>
                        {data.list[1].btntext}
                      </SecondaryButton>
                    )}
                  </>
                ) : ("")
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CTAWithCircle.defaultProps = {
  contactVariant: false,
};

export default CTAWithCircle;
