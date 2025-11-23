/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora erros de linter durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de tipo durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
