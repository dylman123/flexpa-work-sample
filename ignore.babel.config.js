module.exports = api => {
    const isTest = api.env('test')
    // You can use isTest to determine what presets and plugins to use.
    const presets = [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ]
    return isTest ? { presets } : { }
};