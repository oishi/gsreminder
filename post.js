// slackにメッセージを投げる
function postMessageToSlack(channel, message) {
  var options = {
    'method' : 'post',
    'payload' : 'payload={"text": "' + message + '"}'
  };
  var response = UrlFetchApp.fetch(channel, options);
}


/**
 * 各行の日時を調べてメッセージを投げる
 */
function post() { 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sht = ss.getSheetByName("reminders");

  var vals = sht.getRange(ROW_START, 1, sht.getLastRow(), sht.getLastColumn()).getValues();
  for (var r = 0; r < vals.length-1; r++) {
    var row = vals[r];
    var date = new Date(row[COL_DATE-1]);
    var now = new Date();

    if(date < now) {
      if(row[COL_SENT - 1] == "") {
        postMessageToSlack(SLACK_WEBHOOK_URL_REMINDER, row[COL_MESSAGE-1]);
        var status = sht.getRange(ROW_START + r, COL_SENT);
        status.setValue(now);
      }
    }
  }
}


/**
 * 死活確認の意味で定時の自動投稿。使用する時は、トリガーを設定
 */
function hello() {
  postMessageToSlack(SLACK_WEBHOOK_URL_HELLO, "リマインダー稼働中です");
}



/**
 * デバッグ用にspreadsheet側のメニューを追加。使用する時は起動時トリガーに指定
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('debug');
  menu.addItem('post', 'post');
  menu.addToUi(); 
}
