/* ** Created by sanjeev on 10/04/2014. */

/*!
 * QUVIC YouTube Video Browser JavaScript Library v1.6
 * http://www.quvic.com/
 *
 * Copyright 2010-2013, TYZEN
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.tyzen.net
 *
 * Includes TEXTTUBE
 * http://www.texttube.com
 * Copyright 2010-2013, TEXTTUBE
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Tuesday June 25 2013
 */

var quvic = {};

quvic.MAX_RESULTS_LIST = 10;


quvic.THUMBNAIL_WIDTH = 136;

quvic.THUMBNAIL_HEIGHT = 102;


quvic.PLAYER_WIDESCREEN_WIDTH = 848;

quvic.PLAYER_STANDARD_WIDTH = 636;


quvic.PLAYER_HEIGHT = 477;


quvic.VIDEO_LIST_CSS_CLASS = 'videolist';

quvic.PREVIOUS_PAGE_BUTTON = 'previousPageButton';

quvic.NEXT_PAGE_BUTTON = 'nextPageButton';


quvic.STANDARD_FEED_URL_TOP_RATED =
    'http://gdata.youtube.com/feeds/api/standardfeeds/top_rated?';

quvic.STANDARD_FEED_URL_TOP_FAVORITES =
    'http://gdata.youtube.com/feeds/api/standardfeeds/top_favorites?';

quvic.STANDARD_FEED_URL_MOST_POPULAR =
    'http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?';

quvic.STANDARD_FEED_URL_MOST_RESPONDED =
    'http://gdata.youtube.com/feeds/api/standardfeeds/most_responded?';

quvic.STANDARD_FEED_URL_RECENTLY_FEATURED =
    'http://gdata.youtube.com/feeds/api/standardfeeds/recently_featured?';

quvic.STANDARD_FEED_URL_ON_THE_WEB =
    'http://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?';

quvic.VIDEO_FEED_URL =
    'http://gdata.youtube.com/feeds/api/videos?';

quvic.QUERY_URL_MAP = {


    'top_rated' : quvic.STANDARD_FEED_URL_TOP_RATED,

    'top_favorites' : quvic.STANDARD_FEED_URL_TOP_FAVORITES,

    'most_popular' : quvic.STANDARD_FEED_URL_MOST_POPULAR,

    'most_responded' : quvic.STANDARD_FEED_URL_MOST_RESPONDED,

    'recently_featured' : quvic.STANDARD_FEED_URL_RECENTLY_FEATURED,

    'on_the_web' : quvic.STANDARD_FEED_URL_ON_THE_WEB,

    'search' : quvic.VIDEO_FEED_URL
};

quvic.nextPage = 2;

quvic.previousPage = 0;

quvic.previousSearchTerm = '';

quvic.previousQueryType = 'search';

quvic.jsonFeed_ = null;

quvic.appendScriptTag = function(scriptSrc, scriptId, scriptCallback) {

    var oldScriptTag = document.getElementById(scriptId);
    if (oldScriptTag) {
        oldScriptTag.parentNode.removeChild(oldScriptTag);
    }
    var script = document.createElement('script');
    script.setAttribute('src',
        scriptSrc + '&v=2&alt=jsonc&callback=' + scriptCallback);
    script.setAttribute('id', scriptId);
    script.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(script);
};

quvic.listVideos = function(queryType, searchTerm, page) {
    quvic.previousSearchTerm = searchTerm;
    quvic.previousQueryType = queryType;
    var queryUrl = quvic.QUERY_URL_MAP[queryType];
    if (queryUrl) {
        queryUrl += 'max-results=' + quvic.MAX_RESULTS_LIST +
            '&format=5&start-index=' + (((page - 1) * quvic.MAX_RESULTS_LIST) + 1);
        if (searchTerm != '') {
            queryUrl += '&q=' + encodeURI(searchTerm);
        }
        quvic.appendScriptTag(queryUrl,
            'searchResultsVideoListScript',
            'quvic.listVideosCallback');
        quvic.updateNavigation(page);

    } else {
        alert('Unknown feed type specified');
    }
};

quvic.PresentVideos = function(queryType, searchTerm, page) {
    quvic.previousSearchTerm = searchTerm;
    quvic.previousQueryType = queryType;
    var queryUrl = quvic.QUERY_URL_MAP[queryType];
    if (queryUrl) {
        queryUrl += 'max-results=' + quvic.MAX_RESULTS_LIST +
            '&format=5&start-index=' + (((page - 1) * quvic.MAX_RESULTS_LIST) + 1);
        if (searchTerm != '') {
            queryUrl += '&q=' + encodeURI(searchTerm);
        }
        quvic.appendScriptTag(queryUrl,
            'searchResultsVideoListScript',
            'quvic.listVideosCall');
        quvic.updateNavigation(page);
    }
};

quvic.listVideosCall = function(json) {
    quvic.jsonFeed_ = json.data;
    var div = document.getElementById(quvic.VIDEO_LIST_CSS_CLASS);
    var html = ['<LABEL>'];

    var totalitems = number_format(json.data.totalItems);
    var items = eval(json.data.itemsPerPage);
    var start = eval(json.data.startIndex);
    var end = eval(start + items - 1);

    if ( totalitems <= end ) {

        document.getElementById(quvic.NEXT_PAGE_BUTTON).disabled = true;
    }

    html.push(''+start+' - '+end+' of '+totalitems+' ');
    html.push('</LABEL>');
    document.getElementById('videosinfo').innerHTML = html.join('');

    var items = json.data.items || [];
    var html = ['<dl class="videos">'];
    for (var i = 0; i < items.length; i++) {
        var title = json.data.items[i].title;
        var thumbnailUrl = json.data.items[i].thumbnail.sqDefault;
        var videoID = json.data.items[i].id;
        var duration = json.data.items[i].duration;

        html.push('<dt><span class="video_thumb thumbbox"><a href="javascript:playVideo(\''+videoID+'\',\''+addslashes(title)+'\')">');
        html.push('<img src="',thumbnailUrl,'" width="',quvic.THUMBNAIL_WIDTH,'" height="',quvic.THUMBNAIL_HEIGHT,'" onmouseout="mouseOutImage(this)" onmouseover="mousOverImage(this,\'',videoID,'\',1)"></a>');
        html.push('<span class="duration">',getDurationTime(duration),'</span>');
        html.push('</span>');
        html.push('<br/>', title.substr(0,37), '</dt>');}
    html.push('</dl><br style="clear: left;"/>');

    document.getElementById(quvic.VIDEO_LIST_CSS_CLASS).innerHTML = html.join('');

    if (items.length > 0) {
        loadVideo(json.data.items[0].id);
    }
};

function loadVideo(videoID) {
    swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "?version=3&enablejsapi=1&playerapiid=ytplayer&fs=1&autohide=1&modestbranding=1",
        'player', quvic.PLAYER_WIDESCREEN_WIDTH, quvic.PLAYER_HEIGHT, '9.0.0', false, false, {allowScriptAccess: 'always',allowfullscreen: 'true'});
}

quvic.listVideosCallback = function(json) {
    quvic.jsonFeed_ = json.data;
    var div = document.getElementById(quvic.VIDEO_LIST_CSS_CLASS);

    var html = ['<LABEL>'];

    var totalitems = number_format(json.data.totalItems);
    var items = eval(json.data.itemsPerPage);
    var start = eval(json.data.startIndex);
    var end = eval(start + items - 1);

    if ( totalitems <= end ) {

        document.getElementById(quvic.NEXT_PAGE_BUTTON).disabled = true;
    }

    html.push(''+start+' - '+end+' of '+totalitems+' ');
    html.push('</LABEL>');
    document.getElementById('videosinfo').innerHTML = html.join('');



    while (div.childNodes.length >= 1) {
        div.removeChild(div.firstChild);

    }

    var items = json.data.items || [];
    var html = ['<dl class="videos">'];
    for (var i = 0; i < items.length; i++) {
        var title = json.data.items[i].title;
        var thumbnailUrl = json.data.items[i].thumbnail.sqDefault;
        var videoID = json.data.items[i].id;
        var duration = json.data.items[i].duration;

        html.push('<dt><span class="video_thumb thumbbox"><a href="javascript:playVideo(\''+videoID+'\',\''+addslashes(title)+'\')">');
        html.push('<img src="',thumbnailUrl,'" width="',quvic.THUMBNAIL_WIDTH,'" height="',quvic.THUMBNAIL_HEIGHT,'" onmouseout="mouseOutImage(this)" onmouseover="mousOverImage(this,\'',videoID,'\',1)"></a>');
        html.push('<span class="duration">',getDurationTime(duration),'</span>');
        html.push('</span>');
        html.push('<br/>', title.substr(0,37), '</dt>');}
    html.push('</dl><br style="clear: left;"/>');

    document.getElementById(quvic.VIDEO_LIST_CSS_CLASS).innerHTML = html.join('');
};

quvic.updateNavigation = function(page) {
    quvic.nextPage = page + 1;
    quvic.previousPage = page - 1;
    document.getElementById(quvic.NEXT_PAGE_BUTTON).style.display = 'inline';
    document.getElementById(quvic.PREVIOUS_PAGE_BUTTON).style.display = 'inline';
    if (quvic.previousPage < 1) {
        document.getElementById(quvic.PREVIOUS_PAGE_BUTTON).disabled = true;
    } else {
        document.getElementById(quvic.PREVIOUS_PAGE_BUTTON).disabled = false;
    }
    document.getElementById(quvic.NEXT_PAGE_BUTTON).disabled = false;
};

function onPlayerError(errorCode) {
    alert("An error occured of type:" + errorCode);
}


function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("player");
    ytplayer.addEventListener("onError", "onPlayerError");
}


function playVideo(videoID,title){
    if(document.title)
        document.title = title;

    ytplayer.loadVideoById(videoID);
}

function HDPlayer() {
    resizePlayer(quvic.PLAYER_WIDESCREEN_WIDTH, quvic.PLAYER_HEIGHT);
    document.getElementById("Standard").disabled = false;
    document.getElementById("Widescreen").disabled = true;
}

function HQPlayer() {
    resizePlayer(quvic.PLAYER_STANDARD_WIDTH, quvic.PLAYER_HEIGHT);
    document.getElementById("Widescreen").disabled = false;
    document.getElementById("Standard").disabled = true;
}

function resizePlayer(width, height) {
    var playerObj = document.getElementById("player");
    playerObj.height = height;
    playerObj.width = width;
}

function addslashes(str) {
    str=str.replace(/\'/g,'\\\'');
    str=str.replace(/\"/g,'');
    return str;
}

function stripslashes(str) {
    str=str.replace(/\\'/g,'\'');
    return str;
}

var imname;
var timer;
function mousOverImage(name,id,nr){
    if(name)
        imname = name;
    imname.src = "http://img.youtube.com/vi/"+id+"/"+nr+".jpg";
    imname.style.border = 	'3px solid #3B5998'; /*! Thumnail Hoover Color*/
    nr++;
    if(nr > 3)
        nr = 1;
    timer =  setTimeout("mousOverImage(false,'"+id+"',"+nr+");",1000);
}
function mouseOutImage(name){
    if(name)
        imname = name;
    imname.style.border = 	'3px solid #fff'; /*! Thumnail Back Ground Color important quvic.css-> line no. 46*/
    if(timer)
        clearTimeout(timer);
}
function getDurationTime(sec)
{
    var sec_div = ''+((sec%60) | 0);
    if(sec_div.length == 1)
        sec_div = '0'+sec_div;
    return ((sec/60) | 0)+':'+sec_div;
}

function number_format(numstr) {
    var numstr = String(numstr);
    var re0 = /(\d+)(\d{3})($|\..*)/;
    if (re0.test(numstr))
        return numstr.replace(
            re0,
            function(str,p1,p2,p3) { return number_format(p1) + "," + p2 + p3; }
        );
    else
        return numstr;
}
