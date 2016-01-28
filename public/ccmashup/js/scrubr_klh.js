$( document ).ready(function() {
	var iframe_active = $(".activevideo:first").data("zid");
	if (iframe_active == null || iframe_active <= 0) $('#ajax-loader-video').toggle();
	$('#'+iframe_active).load(function(){
			$('#ajax-loader-video').toggle();
    	});

	document.getElementById('video').addEventListener('loadedmetadata', function() {
		this.currentTime = 3;
		}, false);

	});

var scrubCount = 0;	// reset on Shake; increment on swipe right; decrement on swipe left
var videoControl = document.querySelector("video");
console.log(videoControl);

$('.play').click(function(){
    console.log('time´'+video.currentTime);
    video.play;
});
$('.pause').click(function(){
    console.log('time´'+video.currentTime);
    video.currentTime=0;
    video.pause;
});
$(function() {          
	//Enable swiping...
	$(".swipescrub").swipe( {
						//Generic swipe handler for all directions
	                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	                            if (direction == null) return false;
	                            if (direction == 'up') scrubTrack(); //return false;
	                            if (direction == 'down') console.log("down"); //return false;
	                            if (direction == 'right') scrubForward(); //return false;
	                            if (direction == 'left') scrubForward(); //return false;
	                            //if (direction == 'left') rotatelement(".info-panels",180); //return false;
	                        },
	                        //Default is 75px
	                       threshold:15
	                    });
	});

function scrubForward(){
	// Switch to FastForward subtitle returned in data.html
	// data.html_next contains subtitle filename of the next FastForward file

	scrubCount++;
	var videoElement = document.querySelector("video");
	var textTracks = videoElement.textTracks;
	var label = videoElement.textTracks[0].label;
	var language = videoElement.textTracks[0].language;
	var scrubId = $('#'+label).data('scrubid');
	console.log (label, language, scrubId, scrubCount);

	$.ajax({
        url: "api/parser",
        type: "get",
        dataType:"json",
		data: { id : scrubId,  offset : scrubCount },
        statusCode: {
            404: function() {
              alert("Big problem! Page not found");
            }
          },
        success: function(data){
			if (data.bool_flag) {
				console.log(data.html);
				console.log(data.html_next);

				$("video track").remove();
				$("video source").after('<track label="'+label+'" kind="subtitles" srclang="'+language+'" src="/ccmashup/subtitles/horror/'+data.html+'" default>');				
				return;
			} else {
				console.log("error");
				//console.log(data.message + '  ' + data.dbconn);
				return;
			}
        },
		error:function(xhr, textStatus){
			console.log(xhr.status, textStatus);
			//console.log("Hmmm, are you debugging? There is something wrong.");
			},
		complete: function(xhr, textStatus) {
			//console.log(xhr.status, textStatus);
		}
    });
		return;
}

function scrubBackward(){
	scrubCount--;
	var videoElement = document.querySelector("video");
	var textTracks = videoElement.textTracks;
	var label = videoElement.textTracks[0].label;
	var scrubId = $('#'+label).data('scrubid');
	console.log ("left", label, scrubId);

	$.ajax({
        url: "api/parser",
        type: "get",
        dataType:"json",
		data: { id : scrubId,  i : scrubCount },
        statusCode: {
            404: function() {
              alert("Big problem! Page not found");
            }
          },
        success: function(data){
			if (data.bool_flag) {
				data.html = "horror.vtt";
				$("video track").remove();
				$("video source").after('<track label="Sitcom" kind="subtitles" srclang="da" src="/ccmashup/subtitles/horror/'+data.html+'" default>');				
				return;
			} else {
				console.log("error");
				//console.log(data.message + '  ' + data.dbconn);
				return;
			}
        },
		error:function(xhr, textStatus){
			console.log(xhr.status, textStatus);
			//console.log("Hmmm, are you debugging? There is something wrong.");
			},
		complete: function(xhr, textStatus) {
			//console.log(xhr.status, textStatus);
		}
    });
		return;
}

function addSubTrack(){
console.log("scrubright");
var file = scrubForward();
console.log(file);	
$("video track").remove();
$("video source").after('<track label="Sitcom" kind="subtitles" srclang="da" src="/ccmashup/subtitles/horror/horror2.vtt" default>');
}

function test2(){
	var starttime, endtime, text;
	$selector = $("#comedy li").first();
	starttime = $selector.find(".start").text();
	console.log(starttime.length, starttime);
	console.log($selector);

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
}

/*

var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks; // one for each track element
var textTrack = textTracks[0]; // corresponds to the first track element
var kind = textTrack.kind; // e.g. "subtitles"
var mode = textTrack.mode;

console.log(textTracks, textTrack, kind, mode);

textTrack.oncuechange = function (){
  // "this" is a textTrack
  console.log(this);
  console.log(this.activeCues[0]);
  console.log(this.activeCues[0].text);

  var cues = textTrack.cues;
var cue = cues[0]; // corresponds to the first cue in a track src file
var cueId = cue.id // cue.id corresponds to the cue id set in the WebVTT file
var cueText = cue.text; // "The Web is always changing", for example (or some JSON!)
console.log(cueId, cueText);
return;
  var cue = this.activeCues[0]; // assuming there is only one active cue

  var obj = JSON.parse(cue.text);
  // do something
}
*/

var cueCounter = 0;
var trackElements = document.querySelectorAll("track");
console.log(trackElements.length);
console.log(trackElements[0]);

trackElements[0].addEventListener("load", function() {

    var textTrack = this.track; // gotcha: "this" is an HTMLTrackElement, not a TextTrack object
    var isSubtitles = textTrack.kind === "subtitles"; // for example...
    // for each cue
console.log("This is the HTMLTrackElement: "+textTrack);
    console.log(textTrack.activeCues);
    console.log(textTrack.cues.length);
    console.log(textTrack.cues[0].text);
    textTrack.cues[1].text = "someting new";
    console.log(textTrack.cues[0].text);
    console.log(textTrack);

}, false);
/*var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks; // one for each track element
var textTrack = textTracks[0]; // corresponds to the first track element
var kind = textTrack.kind; // e.g. "subtitles"
var mode = textTrack.mode;

console.log(textTracks, textTrack, kind, mode);

textTrack.oncuechange = function (){
*/
trackElements[0].oncuechange = function (){
  // "this" is a textTrack
  console.log("Changed cue counter: " + cueCounter++);
  var textTrack = this.track;
  console.log(textTrack);
  var cue = textTrack.activeCues[0]; // assuming there is only one active cue
  //console.log(cue.text);
  console.log(textTrack.cues[cueCounter].text);
  //var obj = JSON.parse(cue.text);
  // do something
}




  function scrubTrack(){
/*

var trackElements = document.querySelectorAll("track");
console.log(trackElements[0]);

trackElements[0].addEventListener("load", function() {

    var textTrack = this.track; // gotcha: "this" is an HTMLTrackElement, not a TextTrack object
    var isSubtitles = textTrack.kind === "subtitles"; // for example...
    // for each cue
console.log("This is the HTMLTrackElement: "+textTrack);
    console.log(textTrack);

    return;

}, false);




  	return;
var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks; // one for each track element
var textTrack = textTracks[0]; // corresponds to the first track element
var kind = textTrack.kind; // e.g. "subtitles"
var mode = textTrack.mode;

console.log(textTracks, textTrack, kind, mode);

textTrack.oncuechange = function (){
  // "this" is a textTrack
  var cue = this.activeCues[0]; // assuming there is only one active cue
  var obj = JSON.parse(cue.text);
  // do something
}

console.log("end");
return;

*/
    console.log("scrub up");
    $("video track").remove();

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
		   console.log(track, i, starttime[i], endtime[i], text[i]);
		   track.addCue(new VTTCue(starttime[i], endtime[i], text[i]));
		   //track.addCue(new TextTrackCue(starttime[i], endtime[i], text[i]));
		}

return;
		for (var i = 0; i < starttime.length; i++) {
		   //console.log("gere "+track.activeCues[0]);
		    var currentCue = track.activeCues[0];
		    console.log("curemove "+currentCue); 
		                    track.removeCue(currentCue);
           
            /*if (currentCue.text != "") {
                track.removeCue(currentCue)
            }*/
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

/*  
var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks; // one for each track element
var textTrack = textTracks[0]; // corresponds to the first track element
var kind = textTrack.kind // e.g. "subtitles"
var mode = textTrack.mode // e.g. "disabled", hidden" or "showing"
*/


function testscrub() {
	console.log("up")
		var track = video.addTextTrack("captions", "comedy", "en");
		track.mode = "showing";
	var starttime;
	$selector = $("div #comedy li");
	$selector.each(function(i){
		starttime = $(this + ".start").html();
		endtime = $(this + ".end").html();
		text = $(this + ".text").html();
		track.addCue(new VTTCue(starttime, endtime, text));
	});
}




function pinClone() {
	balancelement(".info-panels");
	var ZIDkey_val = $("#info:first").data("todo");
	//$('#ajax-loader-pindu').toggle();
	$('.active').slideToggle();
	var nextactivetodo = $('.active').nextAll('.col-lg-4:first');
	$( ".active" ).remove();
	nextactivetodo.slideToggle().addClass( "active" );

    //Get value and make sure it is not null
	if (ZIDkey_val.length == 0)  window.location.reload();
			$.ajax({
	            url: "pages/functions/votes_addupvote.php",
	            type: "post",
	            dataType:"json",
				data: { ZID_key : ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
					return;
					} else {
					console.log(data.message + '  ' + data.dbconn);
					return;
					//$('#ajax-loader-pindu').toggle();
					// window.location.reload();
					}
	            },
	            error:function(data){
				console.log(' Function error  ');
				$('#ajax-loader-pindu').toggle();
				//window.location.reload();
	            }
	        });
		return;


}
function pinRemove() {
	balancelement(".info-panels");
	var ZIDkey_val = $("#info:first").data("todo");
	//$('#ajax-loader-pindu').toggle();
	$('.active').slideToggle();
	var nextactivetodo = $('.active').nextAll('.col-lg-4:first');
	$( ".active" ).remove();
	nextactivetodo.slideToggle().addClass( "active" );

    //Get value and make sure it is not null
	if (ZIDkey_val.length == 0)  window.location.reload();
			$.ajax({
	            url: "pages/functions/votes_adddownvote.php",
	            type: "post",
	            dataType:"json",
				data: { ZID_key : ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
					return;
					} else {
					console.log(data.message + '  ' + data.dbconn);
					return;
					//$('#ajax-loader-pindu').toggle();
					// window.location.reload();
					}
	            },
	            error:function(data){
				console.log(' Function error  ');
				$('#ajax-loader-pindu').toggle();
				//window.location.reload();
	            }
	        });
		return;


}
function visitorSubmit() {
	$('#ajax-loader-visitorSubmit').toggle();
	var ZIDkey_val = $("#visitorTask").val();
	if (ZIDkey_val.length == 0)  window.location.reload();

			$.ajax({
	            url: "pages/functions/tasks_visitors_add.php",
	            type: "post",
	            dataType:"json",
				data: { body_tasks : ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
						window.location.assign("./login.html");
						return;
					} else {
						$('#ajax-loader-pindu').toggle();
						console.log(data.message + '  ' + data.dbconn);
						alert(data.message + '  ' + data.dbconn);
						window.location.reload();
						return;
					}
	            },
	            error:function(data){
					console.log(' Function error  ');
					$('#ajax-loader-pindu').toggle();
					//window.location.reload();
	            }
	        });

}

function pinLater() {
	$('#ajax-loader-pindu').toggle();
	//$('#ajax-loader-later').toggle();
	window.location.reload();
}

