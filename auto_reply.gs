function doPost(e) {
  let params = JSON.parse(e.postData.getDataAsString());

  if (params.type === 'url_verification') {
    return ContentService.createTextOutput(params.challenge);
  }

  if (params.event && params.event.type === 'message' && !params.event.subtype) {
    handleEvent(params.event);
  }

  return ContentService.createTextOutput(JSON.stringify({ "challenge": params.challenge }));
}

function handleEvent(event) {
  if (event.text.includes('')) { // 反応するメッセージ
    let userId = event.user;
    let replyMessage = createMentionMessage(userId);
    sendReply(event.channel, event.ts, replyMessage);
  }
}

function createMentionMessage(userId) {
  return `<@${userId}> `; // mention (@userid) + message
}

function sendReply(channelId, threadTs, message) {
  let token = ""; // token
  let url = "https://slack.com/api/chat.postMessage";

  let payload = {
    "channel": channelId,
    "text": message,
    "thread_ts": threadTs
  };

  let options = {
    "method" : "post",
    "contentType" : "application/json",
    "headers": {"Authorization": "Bearer " + token},
    "payload" : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

function sendTestMessage() { // for test send messeage
  let channelId = ""; // テストメッセージを送信するチャンネルID
  let message = "test message";
  let token = ""; // token
  let url = "https://slack.com/api/chat.postMessage";

  let payload = {
    "channel": channelId,
    "text": message
  };

  let options = {
    "method" : "post",
    "contentType" : "application/json",
    "headers": {"Authorization": "Bearer " + token},
    "payload" : JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
