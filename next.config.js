const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const { i18n } = require("./next-i18next.config");

module.exports = withFonts(
  withOptimizedImages({
    i18n,
    reactStrictMode: true,
    // Add build timeout configuration
    experimental: {
      workerThreads: false,
      cpus: 1
    },
    // Increase build timeout and add optimization settings
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Increase timeout for build process
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      
      // Optimize for production builds
      if (!dev && isServer) {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /node_modules/,
                priority: 20
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true
              }
            }
          }
        };
      }
      
      return config;
    },
    // Add build performance optimization
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
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
