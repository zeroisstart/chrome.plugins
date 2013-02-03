// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.body.innerHTML = "";

alert('test');
function addButton(name, cb) {
	var a = document.createElement("button");
	a.innerText = name;
	a.onclick = cb;
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(a);
}

function log(str) {
	console.log(str);
	logDiv.innerHTML += str + "<br>";
}

addButton("Clear logs", function() {
	logDiv.innerHTML = "";
});

addButton("Send message with delayed response", function() {
	chrome.extension.sendMessage({
		delayedResponse : true
	}, function(response) {
		log("Background page responded: " + response);
	});
});

addButton("Show counters", function() {
	chrome.extension.sendMessage({
		getCounters : true
	}, function(response) {
		log("In-memory counter is: " + response.counter);
		log("Persisted counter is: " + response.persistentCounter);
	});
});

addButton("Set an alarm", function() {
	chrome.extension.sendMessage({
		setAlarm : true
	});
});

chrome.extension.onMessage.addListener(function(msg, _, sendResponse) {
	log("Got message from background page: " + msg);
});

var logDiv = document.createElement("div");
logDiv.style.border = "1px dashed black";
document.body.appendChild(document.createElement("br"));
document.body.appendChild(logDiv);

log("Ready.");

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// The onClicked callback function.
function onClickHandler(info, tab) {
	console.log(info, tab);
	if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
		console.log("radio item " + info.menuItemId
				+ " was clicked (previous checked state was " + info.wasChecked
				+ ")");
	} else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
		console.log(JSON.stringify(info));
		console.log("checkbox item " + info.menuItemId
				+ " was clicked, state is now: " + info.checked
				+ " (previous state was " + info.wasChecked + ")");

	} else {
		console.log("item " + info.menuItemId + " was clicked");
		console.log("info: " + JSON.stringify(info));
		console.log("tab: " + JSON.stringify(tab));
	}
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
	// Create one test item for each context type.
	var contexts = [ "page", "selection", "link", "editable", "image", "video",
			"audio" ];
	for ( var i = 0; i < contexts.length; i++) {
		var context = contexts[i];
		var title = "Test '" + context + "' menu item";
		var id = chrome.contextMenus.create({
			"title" : title,
			"contexts" : [ context ],
			"id" : "context" + context
		});
		console.log("'" + context + "' item:" + id);
	}

	// Create a parent item and two children.
	chrome.contextMenus.create({
		"title" : "Test parent item",
		"id" : "parent"
	});
	chrome.contextMenus.create({
		"title" : "Child 1",
		"parentId" : "parent",
		"id" : "child1"
	});
	chrome.contextMenus.create({
		"title" : "Child 2",
		"parentId" : "parent",
		"id" : "child2"
	});
	console.log("parent child1 child2");

	// Create some radio items.
	chrome.contextMenus.create({
		"title" : "Radio 1",
		"type" : "radio",
		"id" : "radio1"
	});
	chrome.contextMenus.create({
		"title" : "Radio 2",
		"type" : "radio",
		"id" : "radio2"
	});
	console.log("radio1 radio2");

	// Create some checkbox items.
	chrome.contextMenus.create({
		"title" : "Checkbox1",
		"type" : "checkbox",
		"id" : "checkbox1"
	});
	chrome.contextMenus.create({
		"title" : "Checkbox2",
		"type" : "checkbox",
		"id" : "checkbox2"
	});
	console.log("checkbox1 checkbox2");

	// Intentionally create an invalid item, to show off error checking in the
	// create callback.
	console.log("About to try creating an invalid item - an error about "
			+ "duplicate item child1 should show up");
	chrome.contextMenus.create({
		"title" : "Oops",
		"id" : "child1"
	}, function() {
		if (chrome.extension.lastError) {
			console.log("Got expected error: "
					+ chrome.extension.lastError.message);
		}
	});
});
