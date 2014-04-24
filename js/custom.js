$(document).ready(function()
{

    $('#stackoverflow').qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: 'To Stackoverflow...',
            position: {
                my: 'top center',  // Position my top left...
                at: 'top right', // at the bottom right of...
                target: $('#stackoverflow') // my target
            }
        }
    })

    $("#fiddlerTitle").blink();
    $("#fiddlerTitle").fadeOut(10000);

});