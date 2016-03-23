// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

// AJAX CALL
  function callSpotify(){
    $.ajax({
      type: 'GET',
      url: 'https://api.spotify.com/v1/search',
      data: $("form").serialize(),
      dataType: 'json',
      success: onSuccess,
      error: onError,
      complete: onCompletion
    });
  }


// WHAT TO DO ONCE API IS GRABBED
  function onSuccess(element){
    // var results = element.tracks.items;
    console.log("Here you go:");
    console.log(element);
    element.tracks.items.forEach(function (result, index){
      var trackData = {
        albumArt: result.album.images[0].url,
        artist: result.artists[0].name,
        name: result.name,
        previewUrl: result.preview_url
      };

      var $trackHtml = '<div class="row"><div class="col-xs-4">' +
        '<img src="' + trackData.albumArt + '" class="img-responsive"></div>' +
        '<div class="col-xs-8"><p><strong>' + trackData.name + '</strong> by ' +
        trackData.artist + '</p><p><a href="' + trackData.previewUrl +
        '" target="_blank" class="btn btn-sm btn-default">Preview ' +
        '<span class="glyphicon glyphicon-play"></span></a></p></div></div><hr>';

      // append HTML to the view
      $('#results').append($trackHtml);
    });
  }

  function onError(data){
    console.log('error!' + data);
  }

  function onCompletion(yrmom){
    console.log('complete!' + yrmom);
  }

    $('form').on('submit', function(event){
      event.preventDefault();
      console.log($("form").serialize());
      callSpotify();
      console.log('form submit --> $.ajax');
    });
});
