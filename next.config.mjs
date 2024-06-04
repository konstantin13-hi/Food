/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',

            },
            {
                protocol: 'https',
                hostname: 'food-kanstantsin.s3.amazonaws.com',
            }
        ],
    },
};

export default nextConfig;
