import React, { useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Button from "../components/Core/Button";
import GlobalContext from "../context/GlobalContext";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
// import { identical } from "ramda";

const CTAWithBackground = ({ id, data }) => {
  const router = useRouter();

  const { width, handleCTAWithBG, handleConfigurator, configurator } =
    useContext(GlobalContext);

  useEffect(() => {
    if (router.asPath === "/products") {
      handleCTAWithBG(data);
    }
  }, []);

  // Helper function to extract link URL from btnlink object
  const getLinkUrl = (btnlink) => {
    if (!btnlink) return null;
    // Handle both old and new database structures
    if (typeof btnlink === 'string') return btnlink;
    if (btnlink.href) return btnlink.href;
    if (btnlink.linkText) return btnlink.linkText;
    return null;
  };

  return (
    <section id={`c${id}`} className="cta-background-section">
      {width > 767 ? (
        <>
          {data.image ? (
            <span
              className="cta-bg container-md"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl})`,
              }}
            ></span>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {data.media && data.media.length ? (
            <span
              className="cta-bg"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${data.media[0]?.properties?.originalUrl})`,
              }}
            ></span>
          ):(<></>)}
        </>
      )}
      <div className="container-md">
        <div className="cta-background-wrapper">
          {data.headline && <h1>{data.headline}</h1>}
          <div className="cta-content">
            <div data-aos="fade-up">
              {data.text && (
                <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
              )}
            </div>
            <div className="btn-wrapper" data-aos="fade-up">
              {data.list && data.list.length ? (
                <>
                  {data.list.map((btn,id) => {
                    const linkUrl = getLinkUrl(btn.btnlink);
                    return (
                      <React.Fragment key={btn.btntext}>
                        {btn.btntext && linkUrl && (
                          <>
                            {linkUrl === "#variant1" || linkUrl === "#variant2" ? (
                              <Button onClick={() => {
                                handleConfigurator({...configurator, isVisible:true, data:{step:linkUrl === "#variant1" ? 1 : 3},});
                              }}>
                                {btn.btntext}
                              </Button>
                            ) : (<Button link={linkUrl}>{btn.btntext}</Button>)}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </>
              ):(
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWithBackground;
