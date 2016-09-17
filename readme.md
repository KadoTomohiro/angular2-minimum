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
  

## 構築手順

### 本ドキュメント作成時の環境

* MacBookPro/OSX ElCapitan
* WebStorm 2016.2
* node v6.6.0

### プロジェクトの作成

プロジェクトルートディレクトリを作成し、移動する。
```bash
$ mkdir angular2-minimum && cd $_
```

git管理を開始し、非管理設定を追加。なお、コミット等のタイミングは特に指定しない。
```bash
$ git init
$ touch .gitignore
```
`.gitignore`
```
node_modules
bin
```

package.jsonの作成
```bash
$ npm init -y
```

