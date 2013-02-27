// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global variables only exist for the life of the page, so they get reset
// each time the page is unloaded.
var counter = 1;

var lastTabId = -1;
function sendMessage(){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs){
        lastTabId = tabs[0].id;
        chrome.tabs.sendMessage(lastTabId, "Background page started.");
    });
}




function InsertFunc(tabId, changeInfo, tab){
    chrome.tabs.executeScript(null, {
		file:'js/site.tool.js',
    });
    //让用户界面执行代码。
    //让用户界面执行一个文件的JS。
    //chrome.tabs.executeScript(tabId,{file : "Check.js"});
}

//注册事件的响应函数
//chrome.tabs.onUpdated.addListener(InsertFunc);

//chrome.tabs.onCreated.addListener(InsertFunc);


chrome.tabs.onUpdated.addListener(InsertFunc);


// sendMessage();

chrome.browserAction.setBadgeText({
    text: "ON"
});

// console.log("Loaded.");

// 插件安装的时候触发的函数
chrome.runtime.onInstalled.addListener(function(){
    // alert('chrome.runtime.onInstalled.addListener : 28');
    // console.log("Installed.");
    // localStorage is persisted, so it's a good place to keep state that you
    // need to persist across page reloads.
    localStorage.counter = 1;
    // Register a webRequest rule to redirect bing to google.
    var wr = chrome.declarativeWebRequest;
    /*
     * chrome.declarativeWebRequest.onRequest.addRules([{ id: "0", conditions:
     * [new wr.RequestMatcher({ url: { hostSuffix: "bing.com" } })], actions:
     * [new wr.RedirectRequest({ redirectUrl: "http://google.com" })] }]);
     */
});

// 移除书签的时候
chrome.bookmarks.onRemoved.addListener(function(id, info){
    console.log("remove bookmark", id, info);
});

// 添加书签的时候
chrome.bookmarks.onCreated.addListener(function(id, info){
    console.log("add bookmark", id, info);
});

/*
 * chrome.downloads.download({ url:
 * "http://zhangmenshiting.baidu.com/data2/music/1107449/10211760192.mp3?xcode=f3f8691042e5a1c47637fd9107335d5f" },
 * function(id){ alert(id); });
 */
// 当你点击icon图标的时候
/*
 * chrome.browserAction.onClicked.addListener(function(){ // The event page will
 * unload after handling this event (assuming nothing // else is keeping it
 * awake). The content script will become the main way to // interact with us.
 *  // alert('chrome.browserAction.onClicked.addListener : 66');
 * //打开一个新的页面然后执行一个js页面 //http://google.com //url: "" var
 * viewTabUrl = chrome.extension.getURL('tool.html'); chrome.tabs.create({
 * url:viewTabUrl, }, function(tab){ console.log(tab);
 * chrome.tabs.executeScript(tab.id, { file: "content.js" }, function(){
 * sendMessage(); }); });
 *
 * });
 */
/*
 * chrome.experimental.keybinding.onCommand.addListener(function(command){
 * chrome.tabs.create({ url: "http://www.google.com/" }); });
 */
chrome.extension.onMessage.addListener(function(msg, _, sendResponse){
    if (msg.setAlarm) {
        chrome.alarms.create({
            delayInMinutes: 0.1
        });
    }
    else 
        if (msg.delayedResponse) {
            // Note: setTimeout itself does NOT keep the page awake. We return true
            // from the onMessage event handler, which keeps the message channel
            // open -
            // in turn keeping the event page awake - until we call sendResponse.
            setTimeout(function(){
                sendResponse("Got your message.");
            }, 5000);
            return true;
        }
        else 
            if (msg.getCounters) {
                sendResponse({
                    counter: counter++,
                    persistentCounter: localStorage.counter++
                });
            }
    // If we don't return anything, the message channel will close, regardless
    // of whether we called sendResponse.
});

chrome.alarms.onAlarm.addListener(function(){
    alert("Time's up!");
});

chrome.runtime.onSuspend.addListener(function(){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs){
        // After the unload event listener runs, the page will unload, so any
        // asynchronous callbacks will not fire.
        // alert("This does not show up.");
    });
    // console.log("Unloading.");
    chrome.browserAction.setBadgeText({
        text: ""
    });
    chrome.tabs.sendMessage(lastTabId, "Background page unloaded.");
});
