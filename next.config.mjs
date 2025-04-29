/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: false,
	},
	typescript: {
		ignoreBuildErrors: false,
	},
	images: {
		unoptimized: true,
	},
};

module.exports = {
	output: "standalone",  // Required for Azure
	server: {
	  port: 8080,  // Explicit port setting
	},
  };

export default nextConfig;
