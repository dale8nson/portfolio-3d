/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages:['three', '@react-three/uikit','@react-three/drei', '@react-three/fiber'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
