/* ** Created by sanjeev on 10/04/2014.*/


var sidebar_links = function(){


$(".search_input_sidebar").change();
$(".sidebar").click(function()
{
    var search_input_sidebar = $(".search_input_sidebar").val();
    var sidebarID= encodeURIComponent(search_input_sidebar);

    var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+sidebarID+'?v=2&&max-results=10&alt=json&callback=?';
    var videoURL= 'http://www.youtube.com/watch?v=';
    $.getJSON(playListURL, function(data) {
        var list_data="";
        $.each(data.feed.entry, function(i, item) {
            var feedTitle = item.title.$t;
            var feedURL = item.link[1].href;
            var fragments = feedURL.split("/");
            var videoID = fragments[fragments.length - 2];
            var url = videoURL + videoID;
            var thumb = "http://img.youtube.com/vi/"+ videoID +"/default.jpg";
            list_data += '<li class="top-heading"><p>'+feedTitle+'</p>;<a href="'+ url +'" title="'+ feedTitle +'"><img alt="'+ feedTitle+'" src="'+ thumb +'"</a></li>';

        });
        $('.cont').html(list_data);

    });


});
};


$(document).ready(function()
{
    sidebar_links();
    $(".search_input_nav").change();
    $(".nav").click(function()
    {
        var search_input_nav = $(".search_input_nav").val();
        var keyword= encodeURIComponent(search_input_nav);
        var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=1&v=2&alt=jsonc';

        $.ajax({
            type: "GET",
            url: yt_url,
            dataType:"jsonp",
            success: function(response)
            {
                if(response.data.items)
                {
                    $.each(response.data.items, function(i,data)
                    {
                        var video_id=data.id;
                        var video_title=data.title;
                        var video_viewCount=data.viewCount;
                        var video_frame="<iframe width='100%' height='400px' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' type='text/html'></iframe>";
                        var final="<div id='title'>"+video_title+"</div><div>"+video_frame+"</div><div id='count'>"+video_viewCount+" Views</div>";
                        $("#result").html(final);
                    });


                }
                else
                {
                    $("#result").html("<div id='no'>No Video</div>");
                }
            }

        });

    });
});

/*   advanced search */

function getq(url)
{
    return url.substring(url.indexOf('=')+1);
}

var qurl;
qurl = location.search;

var q = getq(qurl);


if (q)
{
    quvic.PresentVideos('search',q,1);

    if(document.title)
        document.title = ""+decodeURI(q).replace("+"," ")+" :: QUVIC.COM YouTube Video Search";

}
else{
    quvic.PresentVideos('top_rated','',1);
}

