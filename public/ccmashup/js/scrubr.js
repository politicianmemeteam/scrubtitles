var activeCueIds = [];
var nScrubs = -1; //number of times scrubed. Could put in a function to reset after x number scrubs, and then instead load new subs in same genre.

$( document ).ready(function() {
  //for when DOM is ready..
  
  
  //initialise with subs:
  scrubTrack(nScrubs + 1);
  
	var iframe_active = $(".activevideo:first").data("zid");
	if (iframe_active == null || iframe_active <= 0) $('#ajax-loader-video').toggle();
	
	$('#'+iframe_active).load(function(){
		$('#ajax-loader-video').toggle();
  });

	document.getElementById('video').addEventListener('loadedmetadata', function() {
		this.currentTime = 3;
	}, false);
  
	//Enable swiping...
	$(".swipescrub").swipe( {
		//Generic swipe handler for all directions
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      
      if (direction == null) {return false;}
      
      if (direction == 'up') {
        console.log("scrub up " + nScrubs);
        scrubTrack(nScrubs);
      }
      
      if (direction == 'down') {console.log("down");} //return false;
      
      if (direction == 'right') console.log("right"); //return false;
      
      if (direction == 'left') {console.log("left");} //return false;
      //if (direction == 'left') rotatelement(".info-panels",180); //return false;
    },
   //Default is 75px
   threshold:15
	});
  
});



function scrubTrack(offsetIndex){
  
  var track = video.addTextTrack("captions", "comedy", "en");
  
  track.mode = "showing";

  //arrays for upcoming cues
  var starttime = [], endtime = [] , text = [] ;

  $selector = $("#comedy li").eq(offsetIndex);

  //making a buffer of 60 seconds from the list-items in the api, storing them in the starttime, endtime and text arrays.
  $selector.each(function(i){
  	starttime[i] = $selector.eq(i).find(".start").text();
  	endtime[i]   = $selector.eq(i).find(".end").text();
  	text[i]      = $selector.eq(i).find(".text").text();
	});
  
  //console.log(starttime.length, starttime);
  //console.log($selector);


	for (var i = 0; i < starttime.length; i++) {
	  console.log(i, starttime[i], endtime[i], text[i]);
	  //newCue = new VTTCue(starttime[i], endtime[i], text[i]);
	  track.addCue(new VTTCue(starttime[i], endtime[i], text[i]));
    //storing cue ID's in the activeCueIds array - to be used for deletion
	  //activeCueIds[i] = newCue.id;
	}
  
	/*track.addCue(new VTTCue(0, 12, "Loaded Cues"));
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
	track.addCue(new VTTCue(118.25, 119.5, "We're almost done. Shhh..."));	*/
	//return offsetIndex;
	offsetIndex++;
} 


/*laravel specifics? don't know where these came from */

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
