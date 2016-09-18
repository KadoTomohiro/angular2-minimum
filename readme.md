# Angular2 Minimum

要件を満たすAngular2の最小構成を探る。他のプロジェクトのテンプレートとなることを目指す。

## とりあえず試す場合

```bash
$ git clone [this project clone-url]
$ cd angular2-minimum
$ npm install
$ npm run start:aot
```

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
  

## プロジェクトの構築

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
$ npm install -S angular/{common,compiler,core,forms,http,platform-browser,platform-browser-dynamic,router} rxjs@5.0.0-beta.12 zone.js@0.6.21 reflect-metadata core-js 
```

* `@angular/{...}`はAngularを構成するモジュール群。`form`,`http`,`router`は今回は必要ないが、普通のWebAppではよく使うので入れておく。
* zone.jsとrxjsはangular2のPEER DEPENDENCY
* reflect-metadata?
* core-jsはES2015のpolyfill。必要か？

#### Typescrip

##### インストール
```bash
$ npm install -D typescript@beta tslint @types/es6-shim
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
    "eofline": false,
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
$ npm install -D webpack@beta ts-loader tslint-loader
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
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint',
      query: {
        configFileName: 'tsconfig.json'
      }
    }],
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
$ touch bs-config.json
```

##### 設定

`bs-config.json`
```json
{
  "port": 8000,
  "files": ["./**/*.{html,htm,css,js}"],
  "server": {
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

## アプリの作成

Hello Worldアプリ

### ディレクトリの作成

```bash
$ mkdir src src/modules src/components
```

* src: Angularアプリ資産の格納先
* src/modules: モジュールクラスを格納
* src/components: コンポーネントクラスを格納

ディレクトリ構成は悩み中

### エンドポイント

```bash
$ touch src/index.html src/main.ts
```

`index.html`
```hrml
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <base href="/">
  <title>Angular2 Minimum</title>
</head>
<body>
  <!-- 1. Display the application -->
  <my-app>Loading...</my-app>

  <!-- 2. Load libraries -->
  <script src="node_modules/zone.js/dist/zone.js"></script>
  <script src="node_modules/reflect-metadata/Reflect.js"></script>

  <!-- 3. Configure SystemJS -->
  <script src="bootstrap.bundle.js"></script>
</body>
</html>
```

* `base`要素は必須
* `script`要素は`my-app`要素より後に記述すること
* `bootstrap.bundle.js`はwebpackが生成する

`main.ts`
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
```

### module
```bash
$ touch src/modules/app.module.ts
```

`app.module.ts`
```ts
import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from '../components/app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
```

### component
```bash
$ touch src/components/app.component.ts
```

`app.component.ts`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',

  template: `
  <h1>{{title}}</h1>
  `,
})
export class AppComponent {
  title:string = 'Hello World!';
}
```

## 実行

```
npm start
```

## AoTの導入

### angular compiler cli

#### インストール
```bash
$ npm install -S @angular/{compiler-cli,platform-server}
$ npm install -D @types/node
```

#### 設定
```bash
$ touch tsconfig.aot.json
```

`tsconfig.aot.json`
```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "moduleResolution": "node",
    "declaration": false,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "pretty": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitUseStrict": false,
    "noFallthroughCasesInSwitch": true,
    "outDir": "./bin",
    "rootDir": "./src",
    "types": [
      "node"
    ]
  },
  "angularCompilerOptions": {
    "debug": true
  },
  "compileOnSave": false,
  "files": [
    "src/main.ts"
  ],
  "exclude": [
    "node_modules",
    "bin"
  ]
}
```

`webpack.config.js`(entpryを修正)
```javascript
  entry: {
    'bootstrap': './src/main.ts',
    'bootstrap.aot': './src/main.aot.ts'
  },
```

#### npmコマンド
`package.json`
```json
"scripts": {
  "ngc": "ngc -p ./tsconfig.aot.json",
  "start:ngc": "npm run ngc && npm start"
}
```

#### エンドポイントの修正
`src/index.html`
```html
  <!-- 3. Configure SystemJS -->
  <!--<script src="bootstrap.bundle.js"></script>-->
  <script src="bootstrap.aot.bundle.js"></script>
```

```bash
$ touch src/main.aot.ts
```

`src/main.aot.ts`
```typescript
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './modules/app.module.ngfactory';
const platform = platformBrowser();
platform.bootstrapModuleFactory(AppModuleNgFactory);
```

#### ngfactory生成

`modules/app.module.ngfactory`は存在しないのでエラーが出る。`ngc`コマンドで`ngfactory`を生成する。
```bash
$ npm run ngc
```

`*.ngfactory.ts`はgitから除外しておく。

`.gitignore`
```
*.ngfactory.ts
```

#### 実行

```bash
$ npm run start:aot
```

aotありの場合、生成されたbundleファイルサイズが半分くらいになっているはず。
