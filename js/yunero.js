

//var youTubeURL = "http://www.youtube.com/playlist?list=PLZnxqowr6IKidF63-ybswuiO074g366-Y";
//var youTubeURL = "http://www.youtube.com/user/Apple?feature=blablabka";
//var youTubeURL = "http://www.youtube.com/user/Apple";
var youTubeURL = "http://www.youtube.com/playlist?list=PL1512BD72E7C9FFCA";

//optional---------------------------------------
var yuneroWidgetHeight = 400;
var yuneroWidgetWidth = 340;
var yuneroVideoHeight = 200;

function goClicked() {
    $('#yunero').empty().append(' loading ...');
    youTubeURL=$('#youTubeUrl').val();

    loadYunero();
    }
