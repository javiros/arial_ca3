/* ** Created by sanjeev on 10/04/2014.*/
var video = [];
    $(function(){
        $('#usersnav ul li a').on('click', function(e){
            e.preventDefault();
            var htmlString  = '<ul id="videoslisting">';
            var channelname = $(this).attr('href').substring(1);
            var ytapiurl    = 'http://gdata.youtube.com/feeds/api/users/'+channelname+'/uploads?alt=json&max-results=10';

            $.getJSON(ytapiurl, function(data) {
                $.each(data.feed.entry, function(i, item) {
                    var title    = item['title']['$t'];
                    var videoid  = item['id']['$t'];

                    var pubdate  = item['published']['$t'];
                    var fulldate = new Date(pubdate).toLocaleDateString();

                    var thumbimg = item['media$group']['media$thumbnail'][0]['url'];
                    var tinyimg1 = item['media$group']['media$thumbnail'][1]['url'];
                    var tinyimg2 = item['media$group']['media$thumbnail'][2]['url'];
                    var tinyimg3 = item['media$group']['media$thumbnail'][3]['url'];

                    var vlink    = item['media$group']['media$content'][0]['url'];
                    var ytlink   = item['media$group']['media$player'][0]['url'];
                    var numviews = item['yt$statistics']['viewCount'];
                    var numcomms = item['gd$comments']['gd$feedLink']['countHint'];

                    htmlString +='<li class="clearfix"><h2>' + title + '</h2>';
                    // code for embeded iframe!
                    htmlString +='<div class="videothumb"><iframe src="' + vlink + '" target="_blank" width="480" height="360"></iframe></div>';
                    htmlString +='<div class="meta"><p>Published on <strong>' + fulldate + '</strong></p><p>Total views: <strong>' + commafy(numviews) + '</strong></p>' +
                        '<p>Total comments: <strong>'+ numcomms +'</strong></p>' +
                        '<p><a href="'+ ytlink +'" class="external" target="_blank">View on YouTube</a></p>' +
                        '<p><a href="'+ vlink +'" class="external" target="_blank">View in Fullscreen</a></p>';
                    // hiding the alt thumbnails
                    //+
                    //'<p><strong>Alternate Thumbnails</strong>:<br><img src="'+ tinyimg1 +'"> ' +
                    //'<img src="' + tinyimg2 + '"> <img src="'+ tinyimg3 +'"></p></div></li>';
                    video.push(numviews);
                }); // end each loop

                $('#videos').html(htmlString + "</ul>");

                //********************************************
                //below is attempt to embed the videos see vid_embed.js file
                //$('#videos').html(htmlString + "</ul>").append('<iframe width="560" height="349" src="http://www.youtube.com/embed/'
                //+ htmlString + '?html5=1&theme=dark&showinfo=0&modestbranding=1&controls=0" allowfullscreen></iframe>');

            }); // end json parsing
        }); // end click event handler

        // commafy function source
        // http://stackoverflow.com/a/6785438/477958
        function commafy( arg ) {
            arg += '';
            var num = arg.split('.');
            if (typeof num[0] !== 'undefined'){
                var int = num[0];
                if (int.length > 3){
                    int     = int.split('').reverse().join('');
                    int     = int.replace(/(\d{3})/g, "$1,");
                    int     = int.split('').reverse().join('')
                }
            }
            if (typeof num[1] !== 'undefined'){
                var dec = num[1];
                if (dec.length > 4){
                    dec     = dec.replace(/(\d{3})/g, "$1 ");
                }
            }

            return (typeof num[0] !== 'undefined'?int:'')
                + (typeof num[1] !== 'undefined'?'.'+dec:'');
        }
    });
//code for Chart
var videoChart = video;
videoLength = video.length
//Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
var myNewChart = new Chart(ctx);
{

    for (var i=0; i<videoLength; i++) {

        var data = [
            {
                value: videoChart[i],
                color:"#F38630"
            },
            {
                value : videoChart[i],
                color : "#E0E4CC"
            },
            {
                value : videoChart[i],
                color : "#69D2E7"
            }
        ];
    }
}
var options = {
    scaleFontColor: "#f00",
    datasetStrokeWidth: 20
};

new Chart(ctx).Pie(data,options);

