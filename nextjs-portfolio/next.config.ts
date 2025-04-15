import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	productionBrowserSourceMaps: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: "/images/**",
			},
		],
	},
	webpack: (config, { dev, isServer }) => {
		// Disable source maps in development
		if (dev) {
			config.devtool = false;
		}
		return config;
	},
	// Add Turbopack configuration
	experimental: {
		turbo: {
			rules: {
				// Disable source maps in Turbopack
				"*.js": {
					// @ts-ignore
					sourceMaps: false,
				},
			},
		},
	},
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
			{
				source: "/ingest/decide",
				destination: "https://eu.i.posthog.com/decide",
			},
		];
	},
	skipTrailingSlashRedirect: true,
};

export default nextConfig;
