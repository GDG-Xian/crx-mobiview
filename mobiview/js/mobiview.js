var background = chrome.extension.getBackgroundPage();

// Prepend http:// if the given url is not started with http:// or https://
function fixUrl(url) {
    if ( /^http:\/\//i.test(url) || /^https:\/\//i.test(url)) {
        return url
    } else {
        return 'http://' + url;
    }
}

$('#location-form').submit(function() {
    var location = $.trim($('#location').val());
    var url = fixUrl(location);
    console.log(url);
    console.log('browsing: ' + url);
    $('#viewport').attr('src', url);
    $('#location').val(url);
    return false;
});
