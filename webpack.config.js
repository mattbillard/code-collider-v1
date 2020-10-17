const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const consts = require('./constants.js');
const { bypass, onProxyReq, onProxyRes } = require('./proxy');

module.exports = (env = {}) => {
  const mode = env.NODE_ENV || 'production';
  
  return {
    mode,
    entry: {
      index: './src/index.tsx',
    },
    plugins: [
      new HtmlWebpackPlugin({ title: 'test' }),
      new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css', }),
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),                  // Write files here
      publicPath: '/dist/'                                    // Prepend output JS/CSS/etc pathnames with /dist/
    },
    optimization: {
      usedExports: true,                                      // Use tree-shaking to remove unused code
      minimizer: [
        new TerserJSPlugin({ sourceMap: true}),               // Minimize JS
        new OptimizeCSSAssetsPlugin({}),                      // Minimize CSS
      ],
      // splitChunks: { chunks: 'all' },                      // Make vendors file. Split code common to different entry points
    },
    module: {
      rules: [
        { test: /\.(ts|tsx|js|jsx)$/, loader: 'babel-loader', }, // NOTE: babel-loader is much faster than ts-loader, so use Bable to do TS->JS. Check/emit types calling tsc from package.json
        { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'], },
      ],
    },
    devtool: 'source-map',
    devServer: {
      hot: false,                                             // Turn off hot/live reloading b/c it conflicts with proxy
      liveReload: false,
      inline: false,

      open: true,                                             // Open browser on start up
      publicPath: '/dist/',                                   // All devserver URLs start with this
      openPage: [                                             // Open browser to this page(s)
        'https://localhost:8080',
        'https://localhost:8080/dist/index.html',
      ],
      // contentBase: path.join(__dirname, 'public'),         // Also serve ./public from localhost:8080/
      noInfo: true,                                           // Do not output stats so we can more easily see TypeScript warnings
      progress: true,                                         // Show percentage progress

      port: 8080,
      https: true,
      host: '0.0.0.0',                                        // Allow other computers on this network to access this localhost via this machine's IP address
      useLocalIp: true,                                       // Open browser to IP of this machine instead of 'localhost'
      index: '',                                              // Allows proxying when URI===''
      proxy: {                                                // NOTE: Webpack proxy is http-proxy-middleware. See their Github for extra documentation WebPack doesn't have 
        '/': {
          target: consts.WEBSITE_TO_PROXY,
          secure: false,                                      // Do not insist target has valid SSL. (Useful for local development)
          ws: true,                                           // Also proxy WebSockets
          changeOrigin: true,                                 // So the target site doesn't see hostname as 'localhost'
          cookieDomainRewrite: 'localhost',
          
          selfHandleResponse: true,                           // So that the onProxyRes takes care of sending the response
          bypass,                                             // Allows us to not proxy paths beginning with /dist
          onProxyReq,                                         // Modify request before sending
          onProxyRes,                                         // Modify request after receiving
        }
      }
    },
  };
};
