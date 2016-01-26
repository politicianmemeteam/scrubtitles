/*$( document ).ready(function() {
	var iframe_active = $(".activevideo:first").data("zid");
	if (iframe_active == null || iframe_active <= 0) $('#ajax-loader-video').toggle();
	$('#'+iframe_active).load(function(){
			$('#ajax-loader-video').toggle();
    	});

	});*/
$(function() {          
	//Enable swiping...
	$(".swipevis").swipe( {
						//Generic swipe handler for all directions
	                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	                            if (direction == null) return false;
	                            if (direction == 'up') introup(".info-panels"); //return false;
	                            if (direction == 'down') introdown(".info-panels"); //return false;
	                            if (direction == 'right') introright(".info-panels"); //return false;
	                            if (direction == 'left') introleft(".info-panels"); //return false;
	                        },
	                        //Default is 75px, set to 5 for pretty sensitive swiping
	                       threshold:25
	                    });
                });
$(function() {          
	//Enable swiping...
	$(".swipevote").swipe( {
						//Generic swipe handler for all directions
	                        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	                            if (direction == null) return false;
	                            if (direction == 'left') rotateleft(".info-panels");
	                            if (direction == 'up') rotateup(".info-panels");
	                            if (direction == 'right') rotateright(".info-panels");  
	                            if (direction == 'down' ) rotatedown(".info-panels");  
	                        },
	                        //Default is 75px, set to 0 for demo so any distance triggers swipe
	                       threshold:45
	                    });
                });

function rotatelement(idRotate, by) {
	var degrees = "rotate("+by+"deg)";
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).css({ "transform": degrees, "-webkit-transform": degrees, "-moz-transform": degrees });
}
function balancelement(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
	$(idRotate).css({ "transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)" });
	$(idRotate).fadeIn("fast");
	$( "#balanced" ).prop( "checked", true ) ;
}
function rotateup(idRotate) {
    var current_zid = $('.zid-info-hdr:first');
    var id = $(current_zid).data('zid');
	guestsVote('luvit', id);

    var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
    if (current_peggy_pos == 0) Materialize.toast('U LuvIt!', 1000);
    if (current_peggy_pos < 0) Materialize.toast('Saved.', 2000);
    if (current_peggy_pos > 0) Materialize.toast('Edit/update activity.', 2000);

    var nextactivetodo = $('.active').nextAll('.s12:first');
    $( ".active" ).remove();
    nextactivetodo.toggleClass("hide").addClass( "active" );
    if (idRotate == null) idRotate=".info-panels";
    balancelement(idRotate);
}
function rotatedown(idRotate) {	
    var current_zid = $('.zid-info-hdr:first');
    var id = $(current_zid).data('zid');
	guestsVote('niin', id);

        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
        if (current_peggy_pos == 0) Materialize.toast('Not Into It Now.', 1000);
        if (current_peggy_pos < 0) Materialize.toast('Archived as To Do.', 2000);
        if (current_peggy_pos > 0) Materialize.toast('Archived as Done.', 2000);

        $('.active').slideToggle();
	var nextactivetodo = $('.active').nextAll('.s12:first');
	$( ".active" ).remove();
	nextactivetodo.toggleClass("hide").addClass( "active" );
	if (idRotate == null) idRotate=".info-panels";
	balancelement(idRotate);
}
function rotateleft(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
        if (current_peggy_pos == 0) Materialize.toast('Later or Maybe Never? Swipe Up or Down.', 2000);
        
        if ($("input[name=waddle_direction]:checked").val() >= 0)
        {
            var rotate_pos_by = $("input[name=waddle_direction]:checked").val() - 14;       
        } else {
            var rotate_pos_by = 0;
        }
        (rotate_pos_by < 0) ? $( "#left" ).prop( "checked", true ) : $( "#balanced" ).prop( "checked", true ) ;
        rotatelement(idRotate, rotate_pos_by);
}
function rotateright(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
       if (current_peggy_pos == 0) Materialize.toast('Edit or Done? Swipe Up or Down.', 2000);
        
        if ($("input[name=waddle_direction]:checked").val() <= 0)
        {
            var rotate_pos_by = $("input[name=waddle_direction]:checked").val() - (- 14);       
        } else {
            var rotate_pos_by = 0;
        }
        (rotate_pos_by > 0) ? $( "#right" ).prop( "checked", true ) : $( "#balanced" ).prop( "checked", true ) ;
        rotatelement(idRotate, rotate_pos_by);
}


function introup(idRotate) {
    if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
        if (current_peggy_pos == 0) Materialize.toast('U LuvIt!', 1000);
        if (current_peggy_pos < 0) Materialize.toast('Save as Done.', 1000);
        if (current_peggy_pos > 0) Materialize.toast('Open for Editting.', 1000);
    $(idRotate).fadeOut("fast", function() {
    			// Animation complete
			balancelement(idRotate);
		  });
}
function introdown(idRotate) {	
    if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
        if (current_peggy_pos == 0) Materialize.toast('Not Into It Now.', 1000);
        if (current_peggy_pos < 0) Materialize.toast('Maybe Never.', 1000);
        if (current_peggy_pos > 0) Materialize.toast('Archive as Done.', 1000);
    $(idRotate).fadeOut("fast", function() {
			// Animation complete
			$(idRotate).css({ "transform": "rotate(180deg)", "-webkit-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)" });
			$(idRotate).fadeIn();
		  });
}
function introleft(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
        if (current_peggy_pos == 0) Materialize.toast('Later or Maybe Never.', 1000);
        
        if ($("input[name=waddle_direction]:checked").val() >= 0)
        {
            var rotate_pos_by = $("input[name=waddle_direction]:checked").val() - 14;       
        } else {
            var rotate_pos_by = 0;
        }
        (rotate_pos_by < 0) ? $( "#left" ).prop( "checked", true ) : $( "#balanced" ).prop( "checked", true ) ;
        rotatelement(idRotate, rotate_pos_by);
}
function introright(idRotate) {
	if (idRotate == null) idRotate=".info-panels";
        var current_peggy_pos = $("input[name=waddle_direction]:checked").val();
       if (current_peggy_pos == 0) Materialize.toast('Edit or Done?', 2000);
        
        if ($("input[name=waddle_direction]:checked").val() <= 0)
        {
            var rotate_pos_by = $("input[name=waddle_direction]:checked").val() - (- 14);       
        } else {
            var rotate_pos_by = 0;
        }
        (rotate_pos_by > 0) ? $( "#right" ).prop( "checked", true ) : $( "#balanced" ).prop( "checked", true ) ;
        rotatelement(idRotate, rotate_pos_by);
}
function guestsVote(action, id) {
    if(!id) window.location.reload();
	var url = "/guests/"+action;
    var data = {
			        id : id,
			    }
          $.ajax({
              url: url,
              type: "post",
              data: data,
              statusCode: {
                  500: function() {
                    window.location.reload();
                  },              	
                  404: function() {
                    console.log("Big problem! This page was not found");
                  }
                },
              success: function(data){
					//console.log(id, data.message);
		          if (data.bool_flag) {
					//console.log("Success.");
					} else {
					//console.log(data.message);
					}
              },
              error:function(xhr, textStatus){
				//console.log(xhr.status, textStatus);
              },
              complete: function(xhr, textStatus) {
        		//console.log(xhr.status, textStatus);
              } 
          });
}
function deleteboard(id) {
    if(!id) window.location.reload();
	var url = "/boards/"+id;
    var data = {
			        id : id,
			        _method : 'delete'
			    }
          $.ajax({
              url: url,
              type: "post",
              data: data,
              statusCode: {
                  500: function() {
                    window.location.reload();
                  },              	
                  404: function() {
                    console.log("Big problem! This page was not found");
                  }
                },
              success: function(data){
					window.location.assign("/boards");
		          if (data.bool_flag) {
					//console.log(data.message);
					//console.log("Success.");
					} else {
					//console.log(data.message);
					//console.log("Darn! Something may be wrong.");
					}
              },
              error:function(xhr, textStatus){
				//console.log(xhr.status, textStatus);
				//console.log("Hmmm, are you debugging? There is something wrong.");
				window.location.assign("/boards");
              },
              complete: function(xhr, textStatus) {
        		//console.log(xhr.status, textStatus);
              } 
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
						window.location.assign("./login.html");window.location.reload();
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
	return;
}
function getStarted() {
	$('#ajaxspinner').addClass('active');
	$('#getstarted').toggle();
	window.location.assign("/stream/public");
	return;
}
$('#logo-container').click(function() {
	$('#navispinner').addClass('active');
	$('#logo-container').toggle();
	window.location.assign("/");
    });
$('a.link').click(function() {
	$('#ajaxspinner').addClass('active');
	$('#getstarted').addClass('hide');
    });