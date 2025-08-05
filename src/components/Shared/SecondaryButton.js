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

const SecondaryButton = ({ diffDomain, targetBlank, children, link, className, ...props }) => {
  const linkUrl = getLinkUrl(link);
  
  if (!linkUrl) {
    return (
      <button className={`btn test btn-red btn-br-red ${className}`} {...props}>
        {children}
      </button>
    );
  }

  return (
    <>
      {diffDomain ? (
        <a href={linkUrl.startsWith('http://') || linkUrl.startsWith('https://') ? linkUrl : `${process.env.NEXT_PUBLIC_API_URL1}${linkUrl}`} className={`btn test btn-red btn-br-red ${className}`} target="_blank" {...props}>
          {children}
        </a>
      ) : (
        <Link href={linkUrl} className={`btn test btn-red btn-br-red ${className}`} target={`${targetBlank ? '_blank' : ""}`} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

SecondaryButton.defaultProps = {
  children: "Button",
  className: "",
};

export default SecondaryButton;
