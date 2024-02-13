/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_FB_APP_ID: process.env.NEXT_APP_FB_APP_ID,
    ROBOCREATE_API_BASE_URL: process.env.ROBOCREATE_API_BASE_URL
  },
};

export default nextConfig;
