# Table of contents
[Project Setup](#project_setup)
  * [Set up Webpack](#setup_webpack)
  * [Setup Babel](#setup_babel)
  * [Setup Flow](#setup_flow)

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
```json
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


#### Setup Flow <a name="setup_flow" />
**Install Flow and plugins**
```
yarn add -D flow-bin @babel/preset-flow babel-plugin-transform-flow-enums
```
Install flow enums runtime:
```
yarn add flow-enums-runtime
```

**Config Flow**
Run:
```
yarn init flow
```
to generate a `.flowconfig` file locally. Update it with the following contents:

```yaml
[ignore]
<PROJECT_ROOT>/.history/.*
<PROJECT_ROOT>/node_modules/resolve/test/resolver/malformed_package_json/package.json

[include]

[libs]

[lints]

[options]
enums=true

[strict]
```
**Update Babel config**
Update the `babel.config.json` with the following contents:
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
  "plugins": ["transform-flow-enums"],
  "targets": {
    "esmodules": true
  }
}
```
**Update React js files**
1. Add the `// @flow` comment at the top of the js files.
2. Add return type annotation (use `React.MixedElement` here) for React component:
```javascript
function App(): React.MixedElement {
  ...
}
```
