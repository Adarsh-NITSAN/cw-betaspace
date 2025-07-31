import { Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import fileDownload from "js-file-download";
import { useTranslation } from "../components/i18n/client";
import { useRouter } from "next/router";
import { useState } from "react";

const SimpleDownload = ({ id, data, inAccordion }) => {
  const router = useRouter();
  const { t } = useTranslation(router.locale);
  const [loadingStates, setLoadingStates] = useState({});

  const renderDownloadCols = (lists) => {
    return lists.map((list, index) => {
      const downloadKey = `${list.headline}-${index}`;
      const isLoading = loadingStates[downloadKey];
      
      return (
        <Col
          xs={12}
          sm={inAccordion ? 12 : 6}
          className="download-col"
          data-aos="fade-up"
          key={list.headline && list.headline}
        >
          <div className="download-box">
            <div className="download-img">
              <div className="download-img-in">
                {list.image && list.image.length ? (
                  <img
                    src={list.image[0]?.publicUrl}
                    alt="Table"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="download-content">
              {list.headline && (
                <h3
                  data-content={
                    list.file2 && list.file2.length
                      ? list.file2[0]?.properties?.originalUrl
                          .split(".")
                          .pop()
                          .toUpperCase()
                      : ""
                  }
                >
                  {list.headline}
                </h3>
              )}
              {list.file2 && list.file2.length ? (
                <button
                  onClick={() => {
                    setLoadingStates(prev => ({ ...prev, [downloadKey]: true }));
                    axios
                      .get(
                        list.file2[0]?.publicUrl,
                        {
                          responseType: "blob",
                        }
                      )
                      .then((res) => {
                        fileDownload(
                          res.data,
                          list.file2[0]?.properties?.name || list.file2[0]?.properties?.originalUrl?.replace(
                            "/Download/",
                            ""
                          ) || "download"
                        );
                        setLoadingStates(prev => ({ ...prev, [downloadKey]: false }));
                      })
                      .catch(() => {
                        setLoadingStates(prev => ({ ...prev, [downloadKey]: false }));
                      });
                  }}
                  className="download-link"
                >
                  {t("data.download")}
                  <span className="download-icon">
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <img src="/images/png/download.svg" alt="Download" />
                    )}
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      );
    });
  };

  const renderContent = () => (
    <div className="simple-downloads-wrapper">
      {data.headline && !inAccordion && (
        <h1 data-aos="fade">{data.headline}</h1>
      )}
      {data.text && !inAccordion && (
        <div className="download-teaser" data-aos="fade-up">
          <p>{data.text}</p>
        </div>
      )}
      <Row>
        {data.list && Object.values(data.list).length
          ? renderDownloadCols(Object.values(data.list))
          : ""}
      </Row>
    </div>
  );

  return (
    <section id={`c${id}`} className="simple-downloads-section">
      {inAccordion ? (
        <>{renderContent()}</>
      ) : (
        <div className="container-md">{renderContent()}</div>
      )}
    </section>
  );
};

export default SimpleDownload;
