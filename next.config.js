const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const { i18n } = require("./next-i18next.config");

module.exports = withFonts(
  withOptimizedImages({
    i18n,
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/robots.txt",
          destination: "/api/robots",
        },
      ];
    },
    async redirects() {
      return [
        // Local
        // {
        //   source: "/en/:path*",
        //   destination: "de.localhost:3000/en",
        //   permanent: false,
        // },
        // {
        //   source: "/en",
        //   destination: "de.localhost:3000/en",
        //   permanent: false,
        // },
        // {
        //   source: "/it/:path*",
        //   destination: "de.localhost:3000/it",
        //   permanent: false,
        // },
        // {
        //   source: "/it",
        //   destination: "de.localhost:3000/it",
        //   permanent: false,
        // },
        // {
        //   source: "/fr",
        //   destination: "de.localhost:3000/fr",
        //   permanent: false,
        // },
        // {
        //   source: "/fr/:path*",
        //   destination: "de.localhost:3000/fr",
        //   permanent: false,
        // },
        // {
        //   source: "/pl",
        //   destination: "de.localhost:3000/pl",
        //   permanent: false,
        // },
        // {
        //   source: "/pl/:path*",
        //   destination: "de.localhost:3000/pl",
        //   permanent: false,
        // },
        // Live
        {
          source: "/en/:path*",
          destination: "cwbearing.de/en",
          permanent: false,
        },
        {
          source: "/en",
          destination: "cwbearing.de/en",
          permanent: false,
        },
        {
          source: "/it/:path*",
          destination: "cwbearing.de/it",
          permanent: false,
        },
        {
          source: "/it",
          destination: "cwbearing.de/it",
          permanent: false,
        },
        {
          source: "/fr",
          destination: "cwbearing.de/fr",
          permanent: false,
        },
        {
          source: "/fr/:path*",
          destination: "cwbearing.de/fr",
          permanent: false,
        },
        {
          source: "/pl",
          destination: "cwbearing.de/pl",
          permanent: false,
        },
        {
          source: "/pl/:path*",
          destination: "cwbearing.de/pl",
          permanent: false,
        },
      ];
    },
  })
);
