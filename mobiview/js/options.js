(function($) {
    var $messages = $('#messages');
    function show_messages(message) {
        $messages.html(message).show().delay(3000).fadeOut('slow');
    }

    show_messages('Hello World!');
})(jQuery);
