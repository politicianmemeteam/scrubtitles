$( document ).ready(function() {
	var iframe_active = $(".activevideo:first").data("zid");
	if (iframe_active == null || iframe_active <= 0) $('#ajax-loader-video').toggle();
	$('#'+iframe_active).load(function(){
			$('#ajax-loader-video').toggle();
    	});

	});
$(function() {          
	//Enable swiping...
	$(".swipevis").swipe( {
						//Generic swipe handler for all directions
	                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	                            if (direction == null) return false;
	                            if (direction == 'up') rotateup(".info-panels"); //return false;
	                            if (direction == 'down') rotatedown(".info-panels"); //return false;
	                            if (direction == 'right') rotateright(".info-panels"); //return false;
	                            if (direction == 'left') rotateleft(".info-panels"); //return false;
	                            //if (direction == 'left') rotatelement(".info-panels",180); //return false;
	                        },
	                        //Default is 75px
	                       threshold:15
	                    });
                });
$(function() {          
	//Enable swiping...
	$(".swipefull").swipe( {
						//Generic swipe handler for all directions
	                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	                            if (direction == null) return false;
	                            if (direction == 'left') pinRemove();
	                            if (direction == 'up') pinClone();
	                            if (direction == 'right' || direction == 'down' ) pinLater();  
	                        },
	                        //Default is 75px, set to 0 for demo so any distance triggers swipe
	                       threshold:15
	                    });
                });
function rotatelement(idRotate, by) {
	var degrees = "rotate("+by+"deg)";
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).css({ "transform": degrees, "-webkit-transform": degrees, "-moz-transform": degrees });
}
function balancelement(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).fadeOut();
	$(idRotate).css({ "transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)" });
	$(idRotate).fadeIn("slow");
}
function rotateup(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).fadeOut("slow", function() {
			// Animation complete
			balancelement(idRotate);
		  });
}
function rotatedown(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).fadeOut("slow", function() {
			// Animation complete
			$(idRotate).css({ "transform": "rotate(180deg)", "-webkit-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)" });
			$(idRotate).fadeIn();
		  });
}
function rotateleft(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).css({ "transform": "rotate(-14deg)", "-webkit-transform": "rotate(-14deg)", "-moz-transform": "rotate(-14deg)" });
}
function rotateright(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).css({ "transform": "rotate(14deg)", "-webkit-transform": "rotate(14deg)", "-moz-transform": "rotate(14deg)" });
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