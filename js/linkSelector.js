$(document).ready(function(){

    $("#navSelector a").click(function(e){
        var txt=$(e.target).text();
        $("#channelName").html(txt);

    });
 });

//thumbnail display to main body

$("#sideThumb").click(function( event ){
    console.log(url);
    event.preventDefault();
    $("#result")
        .show()
        .append.html(url);
});