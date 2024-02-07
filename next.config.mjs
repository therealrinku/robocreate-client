/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_FB_APP_ID: process.env.NEXT_APP_FB_APP_ID,
  },
};

export default nextConfig;
