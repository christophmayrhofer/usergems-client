const path = require('path');
const easyWebpack = require('@easy-webpack/core');
const babelLoader = require('@easy-webpack/config-babel');
// const eslintLoader = require('@easy-webpack/config-eslint');
const htmlLoader = require('@easy-webpack/config-html');
const cssLoader = require('@easy-webpack/config-css');
const fontImgLoader = require('@easy-webpack/config-fonts-and-images');
const htmlGenerator = require('@easy-webpack/config-generate-index-html');
const uglifier = require('@easy-webpack/config-uglify');
const aureliaLoader = require('@easy-webpack/config-aurelia');
const commonChunksOptimize = require('@easy-webpack/config-common-chunks-simple');
const globalRegenerator = require('@easy-webpack/config-global-regenerator');
// const globalJQuery = require('@easy-webpack/config-global-jquery');

const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

const aurelia = require('./webpack.aurelia');

const isProduction = process.argv.indexOf('-p') !== -1;
const obfuscate = false;

const title = 'CloudCam';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('build');
const indexFile = path.resolve('src', 'index');

const config = easyWebpack.generateConfig(
  {
    entry: {
      app: [indexFile],
      aureliaBootstrap: aurelia.aureliaBootstrap,
      aurelia: aurelia.aurelia,
    },
    output: {
      path: outDir,
      filename: 'scripts/[name].bundle.js',
      sourceMapFilename: 'scripts/[name].bundle.js.map',
    },
    devServer: {
      port: 81,
      contentBase: path.join(__dirname, 'build'),
      hot: false,
      inline: true,
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new ProgressBarPlugin(),
      (isProduction && obfuscate) ? new JavaScriptObfuscator({
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        debugProtection: true,
        disableConsoleOutput: true,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: true,
        stringArrayThreshold: 0.8,
        unicodeEscapeSequence: true,
      }) : () => {},
    ],
    node: {
      fs: 'empty',
      dns: 'empty',
      net: 'empty',
    },
  },
  // eslintLoader(), // easyWebpack module not yet compatible with webpack 2. Use manual module rule
  babelLoader(),
  htmlLoader(),
  cssLoader(),
  fontImgLoader(),
  htmlGenerator({ minify: isProduction }),
  uglifier({ debug: !isProduction }),
  aureliaLoader({ root: rootDir, src: srcDir, title, baseUrl }),
  globalRegenerator(),
  // globalJQuery(),
  commonChunksOptimize({ appChunkName: 'app', firstChunk: 'aureliaBootstrap' })
);

module.exports = easyWebpack.stripMetadata(config);
