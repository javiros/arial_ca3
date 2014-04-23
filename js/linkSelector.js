$(document).ready(function(){

    $("#navSelector a").click(function(e){
        var txt=$(e.target).text();
        $("#channelName").html(txt);

    });
});