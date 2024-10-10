/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thousand-beans-resized.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
  env: {
    S3_URL: "https://thousand-beans-resized.s3.ap-southeast-1.amazonaws.com/",
  },
};

export default nextConfig;
