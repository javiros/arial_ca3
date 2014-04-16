    // source  http://jsfiddle.net/pKZPP/

$(document).ready(function(){
    $.getJSON("http://gdata.youtube.com/feeds/api/users/MisterAngelMarino/favorites?v=2&alt=jsonc&max-results=1",function(json){
        $.each(json.data.items, function(i){
            var source = json.data.items[i].video.id;
            $("#videos").append('<iframe width="560" height="349" src="http://www.youtube.com/embed/'
                + source + '?html5=1&theme=dark&showinfo=0&modestbranding=1&controls=0" allowfullscreen></iframe>');

        });
    });

});
