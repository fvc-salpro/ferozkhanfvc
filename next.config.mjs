/** @ts-nocheck */
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://calendly.com/;"
                    }
                ]
            }
        ]
    },
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
