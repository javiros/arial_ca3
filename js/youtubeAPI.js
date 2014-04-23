/* ** Created by sanjeev on 10/04/2014.*/
window.video = [];
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
                //code for Chart



             /*   //below is testing to display text in chart
                var ctx = $("#myChart").get(0).getContext("2d");
                //var myNewChart = new Chart(ctx);
                //var myNewChart = new CanvasJS.Chart((ctx),"myChart", {
                var myNewChart = new CanvasJS.Chart("myChart",
                    {
                    title:{
                        text: "Videos Viewed"
                    },
                    theme: "theme2",
                    data: [
                        {type: "pie",
                            indexLabelFontFamily: "Garamond",
                            indexLabelFontSize: 20,
                            startAngle:-20,
                            showInLegend: true,
                            toolTipContent:"{label}",
                            dataPoints: [
                                { value: parseInt(video[0]),legendText:"Google", label: "Google"  },
                                { value: parseInt(video[1]),legendText:"Google", label: "Google"  },
                                { value: parseInt(video[2]),legendText:"Google", label: "Google"  },
                                { value: parseInt(video[3]),legendText:"Google", label: "Google"  },
                                { value: parseInt(video[4]),legendText:"Google", label: "Google"  }
                            ]
                        }
                    ]
                });

                var options = {
                    scaleFontColor: "#f00",
                    datasetStrokeWidth: 20
                };
                //myNewChart.render();
                new Chart(ctx).Pie(myNewChart,options);
*/


//Get context with jQuery - using jQuery's .get() method.
                var ctx = $("#myChart").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
                var myNewChart = new Chart(ctx);
                {


                         var pieData = [

                            {
                                value: parseInt(video[0]),
                                color:"#F38630",
                                label : 'Sleep',
                                labelColor : 'white',
                                labelFontSize : '16'
                            },
                            {
                                value : parseInt(video[1]),
                                color : "#E0E4CC"
                            },
                            {
                                value : parseInt(video[2]),
                                color : "#69D2E7"
                            },
                            {
                                value : parseInt(video[3]),
                                color : "#6958E7"
                            },
                            {
                                value : parseInt(video[4]),
                                color : "#697777"
                            },
                            {
                                value : parseInt(video[5]),
                                color : "#CCCC00"
                            },
                            {
                                value : parseInt(video[6]),
                                color : "#DB9370"
                            },
                            {
                                value : parseInt(video[7]),
                                color : "#cfb53b"
                            },
                            {
                                value : parseInt(video[8]),
                                color : "#691527"
                            },
                            {
                                value : parseInt(video[9]),
                                color : "#ffff00"
                            }
                        ];

                }

                var options = {
                    scaleFontColor: "#f00",
                    datasetStrokeWidth: 20
                };

                new Chart(ctx).Pie(pieData,options);
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



