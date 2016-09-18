# Angular2 Minimum

要件を満たすAngular2の最小構成を探る。他のプロジェクトのテンプレートとなることを目指す。

## 要件

### 必須要件

* Angular 2.0.0
* Typescript 2.0.0
* @types
* webpack
* tslint
* Ahead of Time
* github
* lite-server

### 努力目標

* karma
  * zone.jsのバグ？のため、動かない可能性が高い。優先度を下げる
  

## 環境構築手順

### 本ドキュメント作成時の環境

* MacBookPro/OSX ElCapitan
* WebStorm 2016.2
* node v6.6.0

### プロジェクトの作成

#### プロジェクトルートの作成
```bash
$ mkdir angular2-minimum && cd $_
```

#### git
git管理を開始し、非管理設定を追加。なお、コミット等のタイミングは特に指定しないので、適宜コミットしてください。
```bash
$ git init
$ touch .gitignore
```
`.gitignore`
```
node_modules
bin
```

#### package.json
`package.json`
```bash
$ npm init -y
```

### モジュールのインストール/セットアップ

#### Angular2

##### インストール
```bash
$ npm install -S angular/{common,compiler,core,forms,http,platform-browser,platform-browser-dynamic,router} rxjs@5.0.0-beta.12 zone.js@0.6.21 core-js
```

* `@angular/{...}`はAngularを構成するモジュール群。`form`,`http`,`router`は今回は必要ないが、普通のWebAppではよく使うので入れておく。
* zone.jsとrxjsはangular2のPEER DEPENDENCY
* core-jsはES2015のpolyfill

#### Typescrip

##### インストール
```bash
$ npm install -D typescript@beta tslint
$ touch tsconfig.json tslint.json
```

##### 設定
`tsconfig.json`
```json
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "outDir": "./bin",
    "rootDir": "./src",
    "types": [
      "es6-shim"
    ]
  },
  "exclude": [
    "node_modules",
    "bin"
  ]
}
```

`tslint.json`
```json
{
  "rules": {
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "curly": true,
    "eofline": true,
    "forin": true,
    "indent": [
      true,
      "spaces"
    ],
    "label-position": true,
    "label-undefined": true,
    "max-line-length": [
      true,
      140
    ],
    "member-access": false,
    "member-ordering": [
      true,
      "static-before-instance",
      "variables-before-functions"
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-key": true,
    "no-duplicate-variable": true,
    "no-empty": false,
    "no-eval": true,
    "no-inferrable-types": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unused-expression": true,
    "no-unused-variable": true,
    "no-unreachable": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "quotemark": [
      true,
      "single"
    ],
    "radix": true,
    "semicolon": [
      "always"
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ]
  }
}
```

##### npmコマンド
トランスパイルはwebpackが実行するので、`tsc`コマンドの設定は不要。

#### webpack

##### インストール
```bash
$ npm install -D webpack@beta ta-loader
$ touch webpack.config.js
```


##### 設定
`webpack.config.js`
```
'use strict';
let path = require('path');

module.exports = {
  entry: {
    'bootstrap': './src/main.ts',
    'bootstrap.aot': './src/main.aot.ts'
  },

  output: {
    path: './bin',
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          configFileName: 'tsconfig.json'
        }
      }
    ]
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devtool: 'source-map'
};
```


##### npmコマンド
`package.json`
```json
"scripts": {
  "webpack": "webpack --config webpack.config.js"
}
```

#### lite-server

##### インストール
```bash
$ npm install -D lite-server
$ touch bs-config.js
```

##### 設定

`bs-config.js`
```javascript
const proxy = require('http-proxy-middleware');

var apiProxy = proxy('/app', {
    target: 'http://localhost:8001',
    changeOrigin: true   // for vhosted sites
});

module.exports = {
  "port": 8000,
  "files": ["./**/*.{html,htm,css,js}"],
  "server": {
    middleware: {
      0: require('connect-history-api-fallback')({
        index: '/index.html'
      }),
      1: apiProxy
    },
    "baseDir": [
      "./src/",
      "./bin/"
    ],
    "routes": {
      "/node_modules": "node_modules"
    }
  }
}
```

##### npmコマンド
`package.json`
```json
"scripts": {
  "lite": "lite-server -c bs-config.js",
  "start": "npm run webpack && npm run lite"
}
```

