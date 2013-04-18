var background = chrome.extension.getBackgroundPage();

// Prepend http:// if the given url is not started with http:// or https://
function fixUrl(url) {
    if ( /^http:\/\//i.test(url) || /^https:\/\//i.test(url)) {
        return url
    } else {
        return 'http://' + url;
    }
}

function page_history_go(step) {
    document.getElementById('page').contentWindow.history.go(step);
}

$('#form-location').submit(function() {
    var location = $.trim($('#location').val());
    var url = fixUrl(location);
    console.log(url);
    console.log('browsing: ' + url);
    $('#page').attr('src', url);
    $('#location').val(url);
    return false;
});

$('.btn-history-go').on('click', function() {
    page_history_go(parseInt($(this).data('step')));
});

background.register_handler('navigation', function(url) {
    $('#location').val(url);
});
