# slack-deck

# デモ画面

SlackをTweetDeckのような表示にすることが可能です。


![2021-10-05_02h25_48](https://user-images.githubusercontent.com/15795655/135897333-bb9608d7-e1c0-478b-80b5-80ab6a24a70b.png)


# 使い方


1. appconfig.jsonを設定する

アプリを動作させるために `appconfig.json` の設定が必要です。  
デフォルトでは配置されていないので、テンプレート用のファイル(`<root>/appconfig-template.json`)をコピーして作成してください。  
  
以下の箇所に自身のWorkspaceIdを設定してください。  
`"<ここに自身のWorkspaceIdを入力する>"`   
  
なお、`workspaceId` は ブラウザ版のSlackにアクセスすることで確認できます。    
ブラウザ版SlackのURLが下記のフォーマットとなっているのでこちらから確認できます。    
`https://app.slack.com/client/<workspace_id>/<channel_id>`   

![image](https://user-images.githubusercontent.com/15795655/120112357-69e5ba00-c1b0-11eb-9b06-ae4dbdf60180.png)

2. カラムを追加する

これでアプリを動作させるための準備は終わりです。  
チャンネルURLや、スレッドURL(画像参照)をアプリ上部のフィールドに入力した後に「＋」ボタンを押すことでカラムを追加できます。

![image](https://user-images.githubusercontent.com/15795655/135898002-bb32c0db-0a25-4905-b69c-3c7f3f69338b.png)

![image](https://user-images.githubusercontent.com/15795655/135898072-d4cd777c-77b8-486b-aae3-686c631399a9.png)


