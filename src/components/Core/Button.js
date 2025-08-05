import Link from "next/link";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

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

const Button = ({
  targetBlank,
  diffDomain,
  children,
  className,
  btnWithArrow,
  whiteHover,
  link,
  ...props
}) => {
  const { handleConfigurator, configurator } = useContext(GlobalContext);
  const linkUrl = getLinkUrl(link);
  
  const buttonContent = (
    <>
      {btnWithArrow ? (
        <span className="text-wrapper">
          {children}
          <span className="icon-in">
            <img
              src="/images/png/arrow-white-right-over.svg"
              alt="Arrow Right"
            />
            <img
              src="/images/png/arrow-red-right-over.svg"
              alt="Arrow Right"
              className="hover-visible"
            />
          </span>
        </span>
      ) : (
        <>{children}</>
      )}
    </>
  );

  return (
    <>
      {linkUrl ? (
        <>
          {diffDomain ? (
            <a
              href={linkUrl.startsWith('http://') || linkUrl.startsWith('https://') ? linkUrl : `${process.env.NEXT_PUBLIC_API_URL1}${linkUrl}`}
              className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""
                } ${whiteHover ? "br-hover-white" : ""}`}
              target="_blank"
              {...props}
            >
              {buttonContent}
            </a>
          ) : (
            <Link 
              href={linkUrl} 
              className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""} ${whiteHover ? "br-hover-white" : ""}`} 
              target={`${targetBlank ? '_blank' : ""}`} 
              {...props}
            >
              {buttonContent}
            </Link>
          )}
        </>
      ) : (
        <button
          className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""
            } ${whiteHover ? "br-hover-white" : ""}`}
          onClick={() =>
            handleConfigurator({ ...configurator, isVisible: true })
          }
          {...props}
        >
          {buttonContent}
        </button>
      )}
    </>
  );
};

Button.defaultProps = {
  children: "Button",
  className: "",
  btnWithArrow: false,
  whiteHover: false,
};

export default Button;
