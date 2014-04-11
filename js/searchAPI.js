/* ** Created by sanjeev on 10/04/2014.*/

$(document).ready(function()
{
    $(".search_input").focus();
    $(".search_input").keyup(function()
    {
        var search_input = $(this).val();
        var keyword= encodeURIComponent(search_input);
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
                        var video_frame="<iframe width='100%' height='240px' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' type='text/html'></iframe>";
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