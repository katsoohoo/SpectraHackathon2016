var API_KEY = 'AIzaSyBKCKohZ9yrj-iEEVF4QphJhPXYub1n0ag';

$(document).ready(function()  {
    // Get videos from channel based on input
    var cid = location.search.split('username=')[1];
    getChannelVidList(cid);
    var vid = location.search.split('vid=')[1];
    customizeVid(vid);
    //setVideoInfo('x9v8aNl6Aps');
    custom();
});

//Get video List from channel
function getChannelVidList(userName) {
    $('#cname').html(userName);
    $.get(
       "https://www.googleapis.com/youtube/v3/channels",{
       part : 'contentDetails', 
       forUsername : userName,
       key: API_KEY},
       function(data) {
          $.each( data.items, function( i, item ) {
              pid = item.contentDetails.relatedPlaylists.uploads;
              getVids(pid);
          });
      }
    );
}

//Show individual videos from channel
function getVids(pid){
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",{
        part : 'snippet', 
        maxResults : 20,
        playlistId : pid,
        key: API_KEY},
        function(data) {
            var results;
            $.each( data.items, function( i, item ) {
                var vid = item.snippet.resourceId.videoId;
                results = '<form class="vidblock" action="video.html" method="get" id="' + vid + '">' +
                     '<input type="hidden" name="vid" value="' + vid +'" />' +
                    '<img src="' + item.snippet.thumbnails.high.url + '" /><p><b>' + item.snippet.title + '</b></p></form><br />';

                $('#results').append(results);
                
                document.getElementById(vid).addEventListener("click", function () {
                  document.getElementById(vid).submit();
                });
            });
        }
    );
}

// get video info
function getVidInfo(pid){
    $.get(
        "https://www.googleapis.com/youtube/v3/videos",{
        part : 'snippet', 
        id : pid,
        key: API_KEY},
        function(data) {
            $.each( data.items, function( i, item ) {
                $('#title').html(item.snippet.title);
                $('#pubData').html(item.snippet.publishedAt);
                $('#desc').html(item.snippet.description);
            });
        }
    );
}


function customizeVid(pid) {
    // set video player
    var code = '<video ' +
        'id="vid1" ' + 
        'class="video-js vjs-default-skin" ' +
        'controls ' +
        'autoplay ' +
        'width="640" height="385" ' +
        'data-setup=\'{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=' + pid + '"}] }\'></video>';
    $('#video').html(code);
    // set video info
    getVidInfo(pid);
}

function custom() {
    $('#maincolor').on("change", function(e) {
        var myColor = '#' + document.getElementById("maincolor").value;
        document.querySelector(".video-js").style.color = myColor;
    });
    $('#barcolor').on("change", function(e) {
        var myColor = '#' + document.getElementById("barcolor").value;
        document.querySelector(".vjs-control-bar").style.backgroundColor = myColor;
    })
}



