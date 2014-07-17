// Initialize the player when the page loads

var createPlayer = function(url) {
    $("#video > source").attr("src", url);
    var player = videojs('video', {
	// Make it use HLS
	techOrder: ['hls']
    });
};

$(function() {    
    // Get the source asset ID from the json file
    // This is a workaround to allow the page to get the source asset ID with this demo page
    $.getJSON("source.json", function(sourceAsset) {
	// Request URL: <preview server>/api/preview/<sourceAssetId>/<templateId>/<page>/data
	// For video, templateId is 4128966B-9F69-4E56-AD5C-1FDB3C24F910 and page is always 0
	var reqUrl = "http://localhost:8080/api/preview/" + sourceAsset["source"] + "/4128966B-9F69-4E56-AD5C-1FDB3C24F910/0/data"
	
	// Get the video's location from the Preview daemon
	$.ajax({
	    url: reqUrl
	}).done(function(data) {
	    createPlayer(data);
	});
    });
});

