/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite importar o JSON de dados diretamente como módulo
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
