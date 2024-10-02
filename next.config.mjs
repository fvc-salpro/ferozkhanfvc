/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/robots',
                destination: '/robots.txt',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
