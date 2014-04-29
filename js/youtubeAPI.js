/* ** Created by sanjeev on 10/04/2014.*/
window.video = [];
window.vidTitle = [];
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

                    var thumbimg = item['media$group']['media$thumbnail'][0]['url' ];
                    var tinyimg1 = item['media$group']['media$thumbnail'][1]['url'];
                    var tinyimg2 = item['media$group']['media$thumbnail'][2]['url'];
                    var tinyimg3 = item['media$group']['media$thumbnail'][3]['url'];

                    var vlink    = item['media$group']['media$content'][0]['url'];
                    var ytlink   = item['media$group']['media$player'][0]['url'];
                    var numviews = item['yt$statistics']['viewCount'];
                    var numcomms = item['gd$comments']['gd$feedLink']['countHint'];


                    htmlString +='<li class="clearfix"><h2>' + title + '</h2>';

                    //htmlString += window.vidVideo = '<div class="video-container col-md-9"><video width="640" height="360" controls preload="none"><source src="' + vlink + '?html5=1' +' type="video/mpg4"></video></div>';
                    htmlString +='<div class="video-container col-md-9"><iframe src="' + vlink + '" target="_blank" width="480" height="360" type="video/mpg4"></iframe></div>';
                    htmlString +='<div class="meta col-md-3"><p>Published on <strong>' + fulldate + '</strong></p><p>Total views: <strong>' + commafy(numviews) + '</strong></p>' +
                        '<p>Total comments: <strong>'+ numcomms +'</strong></p>' +
                        '<p><a href="'+ ytlink +'" class="external" target="_blank">View on YouTube</a></p>' +
                        '<p><a href="'+ vlink +'" class="external" target="_blank">View in Fullscreen</a></p>';

                    video.push(numviews);
                    vidTitle.push(title);
                }); // end each loop

                $('#videos').html(htmlString + "</ul>");

                //********************************************
                //code for Chart


                var Chart = new CanvasJS.Chart("Chart",
                    {
                        backgroundColor: "#2b3e50",

                    title:{
                        text: "Videos Viewed",
                        fontColor: "#fff"
                    },
                        legend: {
                            fontColor: "#fff",
                            fontFamily: "Lato, sans-serif, Helvetica, Helvetica Neue, Arial",
                            fontSize: 14
                        },
                        label: {
                            fontColor: "#fff"
                        },
                    theme: "theme1",
                    data: [
                        {type: "pie",
                            indexLabelFontFamily: "Helvetica",
                            indexLabelFontSize: 15,
                            indexLabelFontColor: "#fff",
                            legendMarkerType: "square",

                            startAngle:-20,

                            showInLegend: true,
                            toolTipContent:"{legendText}",
                            dataPoints: [
                                { y: parseInt(video[0]),legendText:vidTitle[0], label: video[0]  },
                                { y: parseInt(video[1]),legendText:vidTitle[1], label: video[1]  },
                                { y: parseInt(video[2]),legendText:vidTitle[2], label: video[2]  },
                                { y: parseInt(video[3]),legendText:vidTitle[3], label: video[3]  },
                                { y: parseInt(video[3]),legendText:vidTitle[4], label: video[4]  },
                                { y: parseInt(video[3]),legendText:vidTitle[5], label: video[5]  },
                                { y: parseInt(video[3]),legendText:vidTitle[6], label: video[6]  },
                                { y: parseInt(video[3]),legendText:vidTitle[7], label: video[7]  },
                                { y: parseInt(video[3]),legendText:vidTitle[8], label: video[8]  },
                                { y: parseInt(video[4]),legendText:vidTitle[9], label: video[9]  }
                            ]
                        }
                    ]
                });

                var options = {
                    scaleFontColor: "#f00",
                    datasetStrokeWidth: 20
                };
                console.log(video);
               Chart.render();

            }); // end json parsing
        }); // end click event handler

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



