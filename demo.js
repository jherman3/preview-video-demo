var createPlayer = function() {
    var p = videojs('video', {
        // Make it use HLS
        techOrder: ['hls']
    });
    return p;
};

var setPlayerSource = function(url) {
    player.src(url);
};

var player = null;
var videoComplete = false;
var updater = null;

var getVideoInfo = function(id) {
    // Request URL: <preview server>/api/preview/<sourceAssetId>/<templateId>/<page>/data
    // For video, templateId is 4128966B-9F69-4E56-AD5C-1FDB3C24F910 and page is always 0
    var reqUrl = "http://localhost:8080/api/preview/" + id + "/4128966B-9F69-4E56-AD5C-1FDB3C24F910/0";
    var status = false;
    $.ajax({
        url: reqUrl,
        async: false
    }).done(function(jsonData) {
        var data = $.parseJSON(jsonData);
        status = data["Status"];
        url = data["Attributes"][0]["Value"][0];
    });
    return [(status === "complete"), url];
};

$(function() {
    player = createPlayer();
    // Get the source asset ID from the json file
    // This is a workaround to allow the page to get the source asset ID with this demo page
    $.getJSON("source.json", function(sourceAsset) {
        updater = setInterval(function() {
            var info = getVideoInfo(sourceAsset["source"]);
            console.log(info);
            if (info[0] == true) {
                setPlayerSource(info[1]);
                clearInterval(updater);
            }
        }, 1000);
    });
});
