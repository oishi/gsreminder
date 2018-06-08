// slackにメッセージを投げる
function postMessageToSlack(message) {
  var options = {
    'method' : 'post',
    'payload' : 'payload={"text": "' + message + '"}'
  };
  var response = UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
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
//    Logger.log(row);
    var date = new Date(row[COL_DATE-1]);
    var now = new Date();

//    Logger.log(date < now);
    if(date < now) {
//      Logger.log(row[COL_SENT - 1]);
//      Logger.log(typeof(row[COL_SENT - 1]));
      if(row[COL_SENT - 1] == "") {
        postMessageToSlack(row[COL_MESSAGE-1]);
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
  postMessageToSlack("おはようございます！");
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
