// code for chart display
var videoChart = video.numviews;

        //Get context with jQuery - using jQuery's .get() method.
         var ctx = $("#myChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);
    {
    
    for (var i=0; i<videoChart.length; i++);


        var data = [

            {
                value: i,
                color:"#F38630"
            },
            {
                value : i,
                color : "#E0E4CC"
            },
            {
                value : i,
                color : "#69D2E7"
            }
        ];
    }
    var options = {
        scaleFontColor: "#f00",
        datasetStrokeWidth: 20
    };

    new Chart(ctx).Pie(data,options);
