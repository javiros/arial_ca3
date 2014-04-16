// source http://forrst.com/posts/Display_YouTube_Videos_Using_JSON_and_jQuery-7uQ

//8**************
// this may be useless as it uses flash
// script is picking up default channel. can it be changed to ours?
// lot of the code is similar to youtubeAPI.js

$(function() {
    var htmlString = "<ul>";
    $.getJSON('http://gdata.youtube.com/feeds/users/michaelrolingtv/uploads?alt=json-in-script&callback=?&max-results=4', function(data) {
        $.each(data.feed.entry, function(i, item) {
            var title = item['title']['$t'];
            var video = item['id']['$t'];

            video_link = video.replace('http://gdata.youtube.com/feeds/videos/','http://www.youtube.com/watch?v=');
            video_object = video.replace('http://gdata.youtube.com/feeds/videos/','http://www.youtube.com/v/');

            htmlString +='<li><object width="285" height="240"><param name="movie" value="' + video_object
                + '"></param><param name="allowFullScreen" value="true">' +
                '</param><param name="allowscriptaccess" value="always">' +
                '</param><embed src="' + video_object
                + '" type="application/x-shockwave-flash"  ' +
                'width="285" height="240"><noembed>Browser does not support video</noembed>' +
                '</embed></object><p>' + title + '</p></li>';
        });

        $('#videos').html(htmlString + "</ul>");
    });
});