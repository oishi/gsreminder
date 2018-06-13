# 概要

GSReminderは、**G**oogleのspreadsheetと**S**lackを連携し、リマインダーとして使用する為のGAS(Google App Script)。GASとかWebhookとか設定したことない人向けのREADME。

# 前提条件

- Google Spread Sheet を使用できること
- Slack の Owner 権限を持っていること

# 事前準備

SlackのWebHook URLを取得しておく

- [Custom Integration](https://feedtailor.slack.com/apps/manage/custom-integrations)のページを開く
- [Incoming WebHooks]→[Add Configuration] をクリック
- Posts to Channel に通知を送りたいチャンネルを指定、[Add Incoming WebHooks integration] をクリック
- Customize Name と Customize Icon を必要に応じて変更
    | | |
    |---|---|
    |Customize Name|Slackで通知する時の名前|
    |Customize Icon|Slackで通知する時のアイコン。emojiから選ぶのが楽で便利|
- Webhook URLをコピーしておく(GASの設定で使う)

# 初期設定

1. 新たなSpreadSheetを作成、適当に名前をつける。内容は[こちら](https://docs.google.com/spreadsheets/d/1lcu0HRbDXLcUi6Rx_3p5H-qp1MbaLcf3yW5s7yEQMPc/)のように。シート名は reminders で。
1. A列とC列は[表示方式]→[数字]から[日時]を指定
1. [ツール]→[スクリプトエディタ]をクリックしてスクリプトエディタを起動
1. コード.gsにpost.jsの中身を全てコピペ(ファイル名はコード.gsからpost.jsに変更しておくと良い)
1. プロジェクトの保存を求められた時は適当に名前をつける
1. スクリプトエディタ上で[ファイル]→[新規作成]→[スクリプト]をクリック、ファイル名に任意の名称をつける
1. 6.で作成したスクリプトに、vars.org.js の内容をそのままコピペ
1. SLACK_WEBHOOK_URL_HELLO と SLACK_WEBHOOK_URL_REMINDER に事前準備で取得した Webhook URL を指定。(個別に設定しても良い。別のwebhook URLを取得するおくこと)

    |||
    |---|---|
    |SLACK_WEBHOOK_URL_HELLO|定期的な動作確認用(GASが動いているかのチェック用)のwebhook|
    |SLACK_WEBHOOK_URL_REMINDER|リマインダーの内容を通知するチャンネルのwebhook|

1. スクリプトに権限を与える必要があるのでダミーで一度関数実行する。[実行]→[関数を実行]→[hello]をクリック、権限認証を求められるので認可
1. スクリプトエディタで[編集]→[現在のプロジェクトのトリガー]をクリック。初めてトリガーを設定する場合は「トリガーが設定されていません。今すぐ追加するにはここをクリックしてください。」をクリック
1. 以下の通りトリガを設定する

    |実行|イベント|設定|
    |---|---|---|
    |post|時間主導型|分タイマー / 1分ごと|
    |hello|時間主導型|週タイマー / 毎週月曜日 / 午前9-10時<br>(GASが動いているかどうかの確認用なので好みで設定)|

# 初期設定(開発者向け)

 git clone して clasp


# 使い方
1. 以下のように行を追加する

    |||
    |---|---|
    |1行目(date)|通知する日時|
    |2行目(message)|通知するテキスト|
    |3行目(sent)|入力しない。通知成功したら自動で日時が記録される|

# 履歴
|version|description|
|---|---|
|0.1|初期バージョン|