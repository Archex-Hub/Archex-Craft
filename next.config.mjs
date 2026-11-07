/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  typedRoutes: false,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: process.cwd()
  },
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/",
        permanent: false
      },
      {
        source: "/work/:path*",
        destination: "/",
        permanent: false
      },
      {
        source: "/engagement-models",
        destination: "/contact",
        permanent: false
      },
      {
        source: "/engagement-models/:path*",
        destination: "/contact",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
