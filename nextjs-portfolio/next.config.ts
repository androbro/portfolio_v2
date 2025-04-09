import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	productionBrowserSourceMaps: false,
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
};

export default nextConfig;
