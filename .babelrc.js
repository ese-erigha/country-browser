module.exports = {
    presets: ['react-app'],
    plugins: [['react-remove-properties', { properties: ['data-testid'] }]],
};
