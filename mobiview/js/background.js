var MOBIVIEW_URL = chrome.extension.getURL('mobiview.html');
var HANDLERS = {};

function storage(key, value) {
    if (value === undefined) {
        return localStorage[key];
    } else {
        localStorage[key] = value; 
    }
}

function register_handler(name, handler) {
    HANDLERS[name] = handler;
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({ url: MOBIVIEW_URL, width: 320, height: 480, type: 'panel' },
        function(win) {
            var tabId = win.tabs[0].id;

            // Listen on iframe navigation.
            chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
                if (details.tabId == tabId 
                    && details.frameId 
                    // && details.parentFrameId == -1
                    && 'navigation' in HANDLERS) {

                    console.log('Processing ', details.url);
                    console.log('  Details:', details);
                    HANDLERS['navigation'](details.url);
                }    
            });

            // Listen on iframe request.
            chrome.webRequest.onBeforeSendHeaders.addListener(
                function(details) {
                    for (var i = 0; i < details.requestHeaders.length; ++i) {
                        if (details.requestHeaders[i].name === 'User-Agent') {
                            // FIXME: Move constants in separated file for global references.
                            details.requestHeaders[i].value = storage('options-user-agent-value');
                        }
                        if (details.requestHeaders[i].name === 'X-Frame-Options') {
                            details.requestHeaders[i].value = "GOFORIT";
                        }
                    }
                    return { requestHeaders: details.requestHeaders };
                },
                {urls: ["<all_urls>"], tabId: tabId },
                ["blocking", "requestHeaders"]
            );
        }
    );
});
