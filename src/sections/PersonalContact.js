import React, { useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import GlobalContext from "../context/GlobalContext";
import RoundedImage from "../components/Shared/RoundedImage";
import SecondaryButton from "../components/Shared/SecondaryButton";
import { validateEmail } from "../utils/validation";
import Link from "next/link";
import rehypeRaw from "rehype-raw";

const PersonalContact = ({ id, data }) => {
  const router = useRouter();

  const { handlePersonalContactData } = useContext(GlobalContext);

  useEffect(() => {
    if (router.asPath === "/products") {
      handlePersonalContactData(data);
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
    <section
      id={`c${id}`}
      className="personal-contact-section blue-top-gradient dark-top-center-shape"
    >
      <div className="container-md">
        <Row className="personal-contact-row">
          <Col sm={12} md={7} className="contact-info-wrapper">
            <div className="contact-info">
              <div className="profile-img">
                {data.image && data.image.length ? (
                  <RoundedImage
                    image={data.image[0]?.publicUrl}
                    imageAlt="Profile"
                    aosAnimation={true}
                    nameClass="br-blue"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="profile-info">
                {data.name && <h3 data-aos="fade-left">{data.name}</h3>}
                {data.designation && (
                  <span data-aos="fade-left" className="position">
                    {data.designation}
                  </span>
                )}
                <div className="btn-wrapper desktop-visible">
                  {data.phone && (
                    <>
                      {data.phone.href ? (
                        <Link
                          data-aos="fade-left"
                          href={data.phone.href}
                          className="tel-no"
                        >
                          {data.phone.title}
                        </Link>
                      ) : (
                        <>
                          <Link
                            data-aos="fade-left"
                            href={`tel: ${data.phone}`}
                            className="tel-no"
                          >
                            {data.phone.title}
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  {data.list && data.list.length ? (
                    <>
                      {data.list.map((b, id) => {
                        const linkUrl = getLinkUrl(b.btnlink);
                        return (
                          <React.Fragment key={b.btntext + id}>
                            {b.btntext && b.btnlink && linkUrl && (
                              <>
                                {validateEmail(
                                  linkUrl.replace("mailto:", "")
                                ) ? (
                                  <Link
                                    className={`btn btn-red btn-br-red`}
                                    href={linkUrl}
                                  >
                                    {b.btntext}
                                  </Link>
                                ) : (
                                  <SecondaryButton
                                    link={linkUrl}
                                    key={b + id}
                                  >
                                    {b.btntext}
                                  </SecondaryButton>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={5}>
            <div className="contact-desc">
              {data.headline && <h1 data-aos="fade-right">{data.headline}</h1>}
              <div data-aos="fade-right" className="contact-content">
                {data.text && (
                  <ReactMarkdown
                    children={data.text}
                    rehypePlugins={[rehypeRaw]}
                    components={{ a: Link }}
                  />
                )}
                <div className="btn-wrapper mobile-visible">
                  {data.list && data.list.length ? (
                    <>
                      {data.list.map((b, id) => {
                        const linkUrl = getLinkUrl(b.btnlink);
                        return (
                          <React.Fragment key={b + id}>
                            {b.btntext && b.btnlink && linkUrl && (
                              <>
                                {validateEmail(
                                  linkUrl.replace("mailto:", "")
                                ) ? (
                                  <Link
                                    className={`btn btn-red btn-br-red`}
                                    href={linkUrl}
                                  >
                                    {b.btntext}
                                  </Link>
                                ) : (
                                  <SecondaryButton
                                    link={linkUrl}
                                    key={b + id}
                                  >
                                    {b.btntext}
                                  </SecondaryButton>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PersonalContact;
