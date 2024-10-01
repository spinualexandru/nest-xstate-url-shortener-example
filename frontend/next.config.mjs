/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/:path*',
            },
        ];
    }
};

export default nextConfig;
