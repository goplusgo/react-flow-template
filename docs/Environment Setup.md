# Table of contents

## [Environment Setup](#environment_setup)
  * [Setup Webpack](#setup_webpack)
  * [Setup Babel](#setup_babel)
  * [Setup Flow](#setup_flow)
  * [Setup ESLint](#setup_eslint)
### Setup Webpack <a name="setup_webpack" />

#### Install Webpack and plugins

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

#### Config Webpack
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

#### Modify scripts
Replace the existing yarn scripts with the following:
```json
"scripts": {
  "dev": "webpack-dev-server --devtool eval --progress --open",
  "start": "webpack serve",
  "build": "webpack"
},
```

#### Modify public/index.html
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

### Setup Babel <a name="setup_babel" />
#### Install Babel and plugins
```
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
```

#### Config Babel
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


### Setup Flow <a name="setup_flow" />
#### Install Flow and plugins
```
yarn add -D flow-bin @babel/preset-flow babel-plugin-transform-flow-enums
```
Install flow enums runtime:
```
yarn add flow-enums-runtime
```

#### Config Flow
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
#### Update Babel config

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
#### Update React js files
1. Add the `// @flow` comment at the top of the js files.
2. Add return type annotation (use `React.MixedElement` here) for React component:
```javascript
function App(): React.MixedElement {
  ...
}
```

### Setup ESLint <a name="setup_eslint" />
#### Install ESLint
```
yarn add -D eslint
```
#### Config ESLint
```
yarn create @eslint/config

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JSON
✔ Would you like to install them now with npm? · Yes
```

After choosing those options, a `.eslintrc.json` is automatically generated with the following contents:
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
```
#### Integrate ESLint with Webpack
```
yarn add -D @babel/eslint-parser
```

Add the `parser` block and file extension rule into the `.eslintrc.json` file:
```json
"parser": "babel-eslint",
"rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
}
```

Install `eslint-webpack-plugin`:
```
yarn add -D eslint-webpack-plugin
```

Update the `webpack.config.js` file to include the plugin:
```javascript
const ESLintPlugin = require("eslint-webpack-plugin");
plugins: [
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      exclude: ["/node_modules/"],
    }),
    ...
]
```

Rerun `yarn run dev` command again, you will be able to see the ESLint style check starts to take effect. Kindly fix those issues and submit a diff for that.
