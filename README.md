# Table of contents
[Project Setup](#project_setup)
  * [Set up Webpack](#setup_webpack)
  * [Setup Babel](#setup_babel)

### Project Setup <a name="project_setup" />
#### Set up Webpack <a name="setup_webpack" />

**Install Webpack and plugins**

Webpack:
```
npm i -g webpack webpack-dev-server
```

```
yarn add -D webpack-cli
```


Webpack Plugins:
```
yarn add -D webpack-manifest-plugin html-webpack-plugin
```

Webpack Loaders:
```
yarn add -D babel-loader css-loader style-loader file-loader
```

**Config Webpack**
Create `webpack.config.js` with the following content:

```javascript
var webpack = require("webpack");

const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(json|png|jpg|gif|txt|ico)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackManifestPlugin({ publicPath: "/public/" }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    hot: true,
  },
};
```

**Modify scripts**
Replace the existing yarn scripts with the following:
```json
"scripts": {
  "dev": "webpack-dev-server --devtool eval --progress --open",
  "start": "webpack serve",
  "build": "webpack"
},
```

**Modify public/index.html**
Replace all the `%PUBLIC_URL%` with `.`. For instance, change:
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```
to
```html
<link rel="icon" href="./favicon.ico" />
```
and add this line into the body section:
```html
<script src="./bundle.js"></script>
```

#### Setup Babel <a name="setup_babel" />
**Install Babel and plugins**
```
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
```

**Config Babel**
Create `babel.config.json` with the following content:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "targets": {
    "esmodules": true
  }
}
```

After we setup Webpack and Babel, now we're able to start the project by running:

```
yarn dev
```
