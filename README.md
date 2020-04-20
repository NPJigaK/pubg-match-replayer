pubg-match-replayer
====

本ツールは PLAYERUNKNOWN'S BATTLEGROUNDS の試合のMAP情報を分析することを目的とした、PC向けWebアプリケーションです。

[こちら](https://kagijpn.github.io/pubg-match-replayer/top/)
から本ツールを利用することが出来ます。

利用推奨環境  
・Google chrome  
※ **AdBlock** 系をブラウザに導入していると、正常に動作しません。
※ ブラウザの設定で **WebGL** を有効化していないと、正常に動作しません。(ブラウザの設定を特にいじっていないのであれば大丈夫です)  
※ [WebGLの有効化設定方法](https://qiita.com/Hiroki_M/items/c93b5b642514cde556d6) をご確認ください。

また、初めてお使いの方は下記の[利用方法](#利用方法)をご一読ください。

## 利用方法

### 試合検索ページの使い方
[試合検索ページ](https://kagijpn.github.io/pubg-match-replayer/top/)に飛ぶとこの様な画面が出てきます。
![search-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer1.JPG)

本ツールは **API KEY** を使います。まだ取得していない方は、[APIKEYの発行方法](#APIKEYの発行方法) から **API KEY** を取得してください。  
- **API KEY** というところに、先ほどコピーしておいた文字列をペーストして、右側の**ADD**ボタンを押下してください。  
- 正常に追加されると、画像のように追加した API KEY が表示されます。  

**API KEY** の登録が完了したら、検索を掛けます。
- プラットフォームと検索を掛けたい PUBG NAME を入力して、右側の**SEARCH**を押下してください。

押下したら、[試合一覧ページ](#試合一覧ページの使い方)に遷移します。

#### APIKEYの発行方法
[PUBG Developer Portal](https://developer.pubg.com/)で API Key を取得します。  
 **GET YOUR OWN API KEY**というところを押して、言われた通りに進めていき、会員登録(無料)をします。(英語のサイトですが、そこまで難しい操作はありません)  
 最終的に、下記のようなページにいくので、**API KEY** と書かれているところの文字列をコピーしておいてください。   
![pubg-apikey](https://raw.githubusercontent.com/KagiJPN/pubg-bluezone-predictor/master/docs/resource/img/pubg-apikey.JPG)

##### tips
本ツールも API Key は複数登録可能です。  
[PUBG Developer Portal](https://developer.pubg.com/)のアカウント１つで最大5つまで **API Key** を発行することが出来ます。  
5つ発行して登録することをお勧めします。  

### 試合一覧ページの使い方
正常な値で遷移されたら、このような画面に飛びます。  
![matches-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer2.JPG)

- 自分が分析したい試合を選んで、 **MAP ANALYZE** を押下してください。

### MAP分析ページの使い方
このページが本ツールのメイン画面となります。  
今のところ、大きく分けて2つの機能があります。  

- [初動降り確認(LandingLocation)](#初動降り確認(LandingLocation))
- [ポジション確認(Replay)](#ポジション確認(Replay))

#### 初動降り確認(LandingLocation)
この画面が一番最初に表示されます。  
表示されている番号と、右側のリストのプレイヤーが紐づいています。  
一番最初に降下した地点を表示しています。  
![landing-location-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer3.JPG)

#### ポジション確認(Replay)
画面右上の **Replay** を押下することで画面を切り替えることが出来ます。  
MAP上部のスライダーを動かすことで、試合の時間を進めたり戻したりすることが出来ます。  
その時間にどのプレイヤーがどこにいるかを確認することが出来ます。  
![replay-page](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer4.JPG)

Replayでは２つオプションがあります。
各ボタンを押下することで設定の ON/OFF を切り替えることが出来ます。
- [isDead](#isDead)
- [TrackingLine](#TrackingLine)

##### isDead
こちらは一番最初に設定されています。  
こちらの設定が ON になっていると、プレイヤーが死んだ場合MAPに表示されなくなります。  
OFF にすると死んだ位置がMAPに表示されたままになります。  
![isDead](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer5.JPG)


##### TrackingLine
こちらの設定を ON にすると、プレイヤーが通った道に線を表示させることが出来ます。  
注意点としてこの設定を ON にした後に、画面右側のリストから表示させたいチームをクリックすることで表示させることが出来ます。  
このオプションでは、最大4チームまでしか設定出来なくしています。(要望があれば変更する可能性あり)  
![TrackingLine](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer6.JPG)

#### other
その他に便利な機能がいくつか存在します。（今後アップデートで増えることもあり）  
- [自動再生](#自動再生)
- [スクリーンショット](#スクリーンショット)

##### 自動再生
スライダーを一定間隔のスピードで自動で動かすことが出来ます。  
スライダー右側のボタンを押下することで再生が開始し、もう一度押すことでストップします。  
さらに右側のスライダーは速度倍率になります(デフォルトは6倍速)  
※ 下記画像を参照  
![AutoReplay](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer7.JPG)

##### スクリーンショット
![screenshot](https://raw.githubusercontent.com/KagiJPN/pubg-match-replayer/master/docs/img/replayer8.JPG)
マップ右上にあるスクリーンショットボタンを押下することで、マップ画像をダウンロードすることができます。
※ この機能は最適化されていないため少し時間が掛かることがあります

## 最後に
分かりづらい説明も多々あると思います。  
なにか分からないことがありましたら、私のディスコードまでお気軽にご連絡ください！

改善案や提案なども随時受け付けております。   
細かいことや小さいことでも構いません！検討したうえで反映させて頂きます！  
より良い, 使いやすいツールにアップデートするためにも、ぜひともご協力のほどよろしくお願い申し上げます！
