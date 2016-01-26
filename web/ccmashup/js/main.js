(function() {
  var genres = ['comedy', 'romance', 'horror'];
  var currentGenre = 0;
  
  $("video source").after('<track label="Sitcom" kind="subtitles" srclang="da" src="subtitles/' + genres[currentGenre] + '.vtt" default>');
	
	function swipeFunction() {
		//Enable swiping...
		$("swipescrub").swipe( {
			//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					console.log("swiped:" + direction);
					if (direction == "right") {
    					scrubTrack();
					}					
					if (direction == "down") {
  					if(currentGenre <= 0){
    					currentGenre = genres.length - 1;
              addSubTrack();
  					} else {
    					currentGenre--;
    					addSubTrack();
  					}
					}
					if (direction == "up"){
  					
  					if(currentGenre >= genres.length - 1){	
    					//console.log(currentGenre + " should be two.");
    					currentGenre = 0;
    					//console.log(currentGenre + " should be zero.");
              addSubTrack();
  					} else {
    					currentGenre++;
    					addSubTrack();
  					}
						
					}
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold:0
			});
	}
	
  function addSubTrack(){
    console.log("hejsa");	
    $("video track").remove();
    $("video source").after('<track label="Sitcom" kind="subtitles" srclang="da" src="subtitles/' + genres[currentGenre] + '.vtt" default>');
  }


  function scrubTrack(){
    console.log("scrub");	
    console.log(currentGenre, genres[currentGenre]);	
		var track = video.addTextTrack("captions", genres[currentGenre], "en");
		track.mode = "showing";

	var track = video.addTextTrack("captions", "comedy", "en");
	track.mode = "showing";

	var starttime = [], endtime = [] , text = [] ;

	$selector = $("#comedy li");
	$selector.each(function(i){
		starttime[i] = $selector.eq(i).find(".start").text();
		endtime[i]   = $selector.eq(i).find(".end").text();
		text[i]      = $selector.eq(i).find(".text").text();
		});
	console.log(starttime.length, starttime);
	console.log($selector);

		for (var i = 0; i < starttime.length; i++) {
		   console.log(i, starttime[i], endtime[i], text[i]);
		   track.addCue(new VTTCue(starttime[i], endtime[i], text[i]));
		}


		track.addCue(new VTTCue(0, 12, "Loaded Cues"));
		track.addCue(new VTTCue(18.7, 21.5, "This blade has a dark past."));
		track.addCue(new VTTCue(22.8, 26.8, "It has shed much innocent blood."));
		track.addCue(new VTTCue(29, 32.45, "You're a fool for traveling alone, so completely unprepared."));
		track.addCue(new VTTCue(32.75, 35.8, "You're lucky your blood's still flowing."));
		track.addCue(new VTTCue(36.25, 37.3, "Thank you."));
		track.addCue(new VTTCue(38.5, 40, "So..."));
		track.addCue(new VTTCue(40.4, 44.8, "What brings you to the land of the gatekeepers?"));
		track.addCue(new VTTCue(46, 48.5, "I'm searching for someone."));
		track.addCue(new VTTCue(49, 53.2, "Someone very dear? A kindred spirit?"));
		track.addCue(new VTTCue(54.4, 56, "A dragon."));
		track.addCue(new VTTCue(58.85, 61.75, "A dangerous quest for a lone hunter."));
		track.addCue(new VTTCue(62.95, 65.87, "I've been alone for as long as I can remember."));
		track.addCue(new VTTCue(118.25, 119.5, "We're almost done. Shhh..."));	
  }  
	
/*	function shakeFunction() {
		var myShakeEvent = new Shake({
		    //threshold: 15, // optional shake strength threshold
		    //timeout: 1000 // optional, determines the frequency of event generation
		});
		
		window.addEventListener('shake', shakeEventDidOccur, false);
		myShakeEvent.start();
	
		//function to call when shake occurs
		function shakeEventDidOccur () {
		    document.querySelector("video").src = "http://stm.dam.digizuite.dk/dmm3bwsv3/306_10032_10001_1_2_0_a91f0be4-6ca7-45dd-97b9-873987e294ff.mp4?635885491307190000"	
		}
	}
	
	
	//sshakeFunction();*/
	swipeFunction();
}());