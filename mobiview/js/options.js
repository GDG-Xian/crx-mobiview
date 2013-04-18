(function($) {
    var background = chrome.extension.getBackgroundPage();

    var TPLS = {
        USER_AGENT_OPTION: '<option value="%{1}">%{1}</option>'
    };

    var USER_AGENT_MAPPINGS = {
        'iPhone - iOS4' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
        'iPhone - iOS5' : 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5',
        'iPad - iOS4'   : 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
        'iPad - iOS5'   : 'Mozilla/5.0 (iPad; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5',
        'Other'         : ''
    };

    var $save             = $('#save');
    var $messages         = $('#messages');
    var $user_agent_name  = $('#user-agent-name');
    var $user_agent_value = $('#user-agent-value');

    function show_messages(message) {
        $messages.html(message).show().delay(3000).fadeOut('slow');
    }

    function change_user_agent(user_agent_name) {
        // Default user-agent is iPhone - iOS4
        var user_agent_value = USER_AGENT_MAPPINGS[user_agent_name] || background.storage('options-user-agent-value');
        $user_agent_name.val(user_agent_name);
        $user_agent_value.val(user_agent_value);
        $user_agent_value.prop('disabled', user_agent_name !== 'Other');
    }

    function save_settings() {
        background.storage('options-user-agent-name', $user_agent_name.val()); 
        background.storage('options-user-agent-value', $user_agent_value.val()); 
        show_messages('Changes saved.');
    }

    function init_components() {
        // Default user-agent is iPhone - iOS4
        var user_agent_name = background.storage('options-user-agent-name') || 'iPhone - iOS4';

        // Init user-agent selections
        for (var name in USER_AGENT_MAPPINGS) {
            $user_agent_name.append($(fmt(TPLS.USER_AGENT_OPTION, name)));
        } 

        // Events bindings
        $user_agent_name.on('change', function() { change_user_agent($(this).val()); });
        change_user_agent(user_agent_name); 
        
        $save.on('click', save_settings);
    }

    init_components();
})(jQuery);
