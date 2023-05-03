/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"]
  }
}

const { withSuperjson } = require("next-superjson")
module.exports = withSuperjson()(nextConfig)
