 //source http://www.berriart.com/sidr/#development
$(document).ready(function() {
    $('#simple-menu').sidr();
    });


$('#responsive-menu-button').sidr({
    name: 'sidr-main',
    source: '#navigation'
});

 // the touchwipe function for devices
$(window).touchwipe({
    wipeLeft: function() {
// Close
        $.sidr('close', 'sidr-main');
    },
    wipeRight: function() {
// Open
        $.sidr('open', 'sidr-main');
    },
    preventDefaultEvents: false
});