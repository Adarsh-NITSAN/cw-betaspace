import Routes from "../utils/Routes";

// In your sitemap.xml API route, add timeout optimization
export const config = {
  maxDuration: 60, // Set appropriate timeout for sitemap generation
}

// Add pagination or limit entries
const maxSitemapEntries = 1000; // Limit entries per sitemap

function Sitemap(pageRoutes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pageRoutes
      .map((slug) => {
        return `
      <url>
          <loc>${`${slug}`}</loc>
          <priority>0.5</priority>
      </url>
    `;
      })
      .join("")}
   </urlset>`;
}

export async function getServerSideProps({ res }) {
  const paths = await Routes();
  let pageRoutes = [];
  await Promise.all(
    paths.map((item) => {
      const paramSlug = item?.params?.slug;
      let slug;
      if (paramSlug && paramSlug.length > 2) {
        slug = paramSlug.toString().replace(/,/g, "/");
      } else if (paramSlug && paramSlug.length > 1) {
        slug = paramSlug.toString().replace(",", "/");
      } else if (!paramSlug) {
        slug = "";
      } else {
        slug = paramSlug[0];
      }
      pageRoutes.push(`${item.locale}/${slug}`);
    })
  );

  // Limit the number of entries to prevent timeout
  pageRoutes = pageRoutes.slice(0, maxSitemapEntries);

  const sitemap = await Sitemap(pageRoutes);
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600"); // Cache for 1 hour
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default Sitemap;
