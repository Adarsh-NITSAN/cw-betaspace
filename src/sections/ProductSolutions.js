import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";

// Helper function to extract link URL from btnlink object
const getLinkUrl = (btnlink) => {
  if (!btnlink) return null;
  // Handle both old and new database structures
  if (typeof btnlink === 'string') return btnlink;
  if (btnlink.href) return btnlink.href;
  if (btnlink.linkText) return btnlink.linkText;
  return null;
};

const renderProducts = (list) => {
  return list.map((product, id) => {
    const linkUrl = getLinkUrl(product.btnlink);
    return (
      <Col key={product + id} sm={12} md={4} data-aos="fade-up">
        <div className="product-details-wrapper">
          <div className="product-details">
            <div className="product-image mobile-visible">
              <div className="img-in">
                {product.image && product.image.length ? (
                  <LazyLoadImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image[0]?.properties?.originalUrl}`}
                    afterLoad={AOSRefresh}
                    alt="Product"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="product-image desktop-visible">
              <div className="img-in">
                {product.image && product.image.length ? (
                  <LazyLoadImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image[0]?.properties?.originalUrl}`}
                    afterLoad={AOSRefresh}
                    alt="Product"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="product-name">
              {product.headline && <h4>{product.headline}</h4>}
            </div>
          </div>
          <div className="choose-wrapper">
            {product.btnlink && product.btntext && linkUrl && (
              <Link href={linkUrl}>
                {product.btntext}
                <span className="mobile-visible">
                  <img
                    src="/images/png/arrow-blue-right-over.svg"
                    alt="Arrow"
                  />
                </span>
                <span className="desktop-visible">
                  <img src="/images/png/arrow-right-circle.svg" alt="Arrow" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </Col>
    );
  })
};

const ProductSolutions = ({ id, data }) => {
  return (
    <section id={`c${id}`} className="product-solutions-section">
      <div className="container-md">
        <div className="product-solutions-inner">
          {data.headline && <h3 data-aos="fade">{data.headline}</h3>}
          {data.list && data.list.length ? (
            <Row>{renderProducts(data.list)}</Row>
          ) : ""}
        </div>
      </div>
    </section>
  );
};

export default ProductSolutions;
