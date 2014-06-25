// Initialize the player when the page loads

$(function() {
    
    $.getJSON("source.json", function(data) {
	$("#video > source").attr("src", data["source"]);
	var player = videojs('video', {
	    // Make it use HLS
	    techOrder: ['hls']
	});
    });
});

