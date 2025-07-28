import Link from "next/link";

// Helper function to extract link URL from various formats
const getLinkUrl = (link) => {
  if (!link) return null;
  
  // If it's already a string, try to parse it as HTML first, then use as-is
  if (typeof link === 'string') {
    try {
      // Try to parse as HTML first (for backward compatibility)
      const parsed = new DOMParser().parseFromString(link, "text/html").documentElement.textContent;
      return parsed || link;
    } catch (error) {
      // If parsing fails, use the string as-is
      return link;
    }
  }
  
  // If it's an object, extract the URL
  if (typeof link === 'object') {
    if (link.href) return link.href;
    if (link.linkText) return link.linkText;
    if (link.url) return link.url;
  }
  
  return null;
};

const MoreLink = ({ children, link, targetBlank, diffDomain }) => {
  const linkUrl = getLinkUrl(link);
  
  if (!linkUrl) {
    return (
      <span className="more-link">
        {children}
        <span className="icon-in">
          <img src="/images/png/arrow-red-right-over.svg" alt="Arrow Red" />
          <img
            className="img-hover"
            src="/images/png/arrow-blue-right-over.svg"
            alt="Arrow Blue"
          />
        </span>
      </span>
    );
  }

  return (
    <>
      {diffDomain ? (
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL1}${linkUrl}`}
          className="more-link"
          target="_blank"
        >
          {children}
          <span className="icon-in">
            <img src="/images/png/arrow-red-right-over.svg" alt="Arrow Red" />
            <img
              className="img-hover"
              src="/images/png/arrow-blue-right-over.svg"
              alt="Arrow Blue"
            />
          </span>
        </a>
      ) : (
        <Link href={linkUrl} className="more-link" target={`${targetBlank ? "_blank" : ""}`}>
          {children}
          <span className="icon-in">
            <img src="/images/png/arrow-red-right-over.svg" alt="Arrow Red" />
            <img
              className="img-hover"
              src="/images/png/arrow-blue-right-over.svg"
              alt="Arrow Blue"
            />
          </span>
        </Link>
      )}
    </>
  );
};

MoreLink.defaultProps = {
  link: "home",
};

export default MoreLink;
