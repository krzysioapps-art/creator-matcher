/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pozwól na połączenia z iPhone przez IP
 allowedDevOrigins: ['192.168.1.14', '192.168.1.17'],
  
  // Wyłącz warning o Turbopack
  turbopack: {},
}

module.exports = nextConfig