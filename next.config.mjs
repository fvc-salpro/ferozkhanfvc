/** @ts-nocheck */
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
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
