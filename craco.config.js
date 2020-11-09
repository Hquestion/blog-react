module.exports = {
    style: {
        postcss: {
            plugins: [
                require("tailwindcss")("./tailwind.config.js")
            ],
        },
    },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
        return {
            ...devServerConfig,
            proxy: {
                '/api/v1': {
                    target: 'http://localhost:7001'
                }
            }
        };
    },
};
