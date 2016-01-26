/*	Add new to do's */				
			var xZID = urlParams["zid"];

	$("#new-todo").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#add-new-todo" ).trigger( "click" );
          }
		});			
		$("#add-new-todo").click(function(e) {
                    e.preventDefault();
                    //Get value and make sure it is not null
                    var ZIDkey_val = $("#ZID-boards").text();
                    var todo_val = $("#new-todo").val();
                    if (todo_val.length == 0) {
                        return;
                    }
			if (xZID === undefined) var homepage = true;
			$('.alert').hide();
			$("#ajax-loader-add").show();
			$('#new-todo').attr("placeholder", "Enter a new to do." );
			var formsURL_call = "pages/functions/tasks_add.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { id_boards : xZID, title :  todo_val, ZID_key : ZIDkey_val, homeZYN: homepage },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
					
                    //Create and remove events; update count
                    if($("#0todo").length != 0) $("#0todo").remove();
					$("#todo-count").html(data.count);
					var event = $("<li />",{id:data.zid});
					var html_noslash = data.html.replace(/\\/g, '');
					event.html(html_noslash);
									
                    $('#todo-list_block').prepend(event);
					$("#ajax-loader-add").hide();
				   
					} else {
					$('.alert').show();
					$('#new-todo-alert').html( data.message );
					$("#ajax-loader-add").hide();
					}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader-add").hide();
					$(".tools").removeAttr("style");
	            }
	        	});

		//Remove event from text input
		$("#new-todo").val("");
		return;
		});
function show_add_todo() {
	$( "#add-todo-box" ).toggle();
	$( "#add-todo-show" ).toggleClass( "fa-minus fa-plus");	
	}

function todo_edit(zid) {
	$("#body-"+zid).toggle();
	}
function todo_edit_save(zid) {
	var save_todo = $("#body-"+zid+" input").val();
	if (save_todo.length == 0) return;
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var formsURL_call = "pages/functions/tasks_update_status.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"edit", body:save_todo },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						$("#"+zid+" span").first().html( data.html );
						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						}
						$("#ajax-loader"+zid).hide();
						$(".tools").removeAttr("style");
						todo_edit(zid);
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            }
	        });
	return;
	}	
function todo_progress(zid) {
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var formsURL_call = "pages/functions/tasks_update_status.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"do" },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						if ( data.task_status === 1 ) {
							if ($('#todo-list_block li').length == 0) {
								var event = $("<li />",{id:"#0todo"});
								var html_noslash = '<span class="text">No To Do\'s to show.</span>';
								event.html(html_noslash);
                    			$('#todo-list_block').prepend(event);						
								}
                    		if($("#0duin").length != 0) $("#0duin").remove();
							$("#"+zid).prependTo("#duin-list_block");
							var new_todo_count = $("#todo-count").text() - 1;
							$("#todo-count").html( new_todo_count );
							$("#duin-count").html( data.count );
							}
						if ( data.task_status === 2 ) {
							if ($('#duin-list_block li').length == 0) {
								var event = $("<li />",{id:"#0duin"});
								var html_noslash = '<span class="text">Start Duin something on this board.</span>';
								event.html(html_noslash);
                    			$('#duin-list_block').prepend(event);						
								}
							if($("#0done").length != 0) $("#0done").remove();
							$("#"+zid).prependTo("#done-list_block");
							var new_duin_count = $("#duin-count").text() - 1;
							$("#duin-count").html( new_duin_count );
							$("#done-count").html( data.count );
							} 

						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						}
						$("#ajax-loader"+zid).hide();
						$(".tools").removeAttr("style");
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            }
	        });
	return;
	}
function todo_back(zid) {	   
	var formsURL_call = "pages/functions/tasks_update_status.php";
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
		$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"redo" },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {						
						if ( data.task_status === 0 ) {
							if ($('#duin-list_block li').length == 0) {
								var event = $("<li />",{id:"#0duin"});
								var html_noslash = '<span class="text">Start Duin something on this board.</span>';
								event.html(html_noslash);
                    			$('#duin-list_block').append(event);						
								}
							if($("#0todo").length != 0) $("#0todo").remove();
							$("#"+zid).prependTo("#todo-list_block");
							var new_duin_count = $("#duin-count").text() - 1;
							$("#duin-count").html( new_duin_count );
							$("#todo-count").html( data.count );
							}
						if ( data.task_status === 1 ) {
							if ($('#done-list_block li').length == 0) {
								var event = $("<li />",{id:"#0done"});
								var html_noslash = '<span class="text">Nothing done yet on this board.</span>';
								event.html(html_noslash);
                    			$('#done-list_block').prepend(event);						
								}
							if($("#0duin").length != 0) $("#0duin").remove();
							$("#"+zid).prependTo("#duin-list_block");
							var new_done_count = $("#done-count").text() - 1;
							$("#done-count").html( new_done_count );
							$("#duin-count").html( data.count );
							} 
						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						//console.log(data.dbconn);
						}
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            }
	        });
	return;
	}
function todo_delete(zid) {
	if ((window.confirm("Are you sure you want to delete?")) == false) { 
  		return;
		}
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	$('#new-todo').attr("placeholder", "Enter a new to do." );
	var formsURL_call = "pages/functions/tasks_update_status.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"delete" },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						$("#"+zid).wrap("<strike>");
						$("#"+zid).remove();
						if ( data.task_status === '0' ) {
							$("#todo-count").html( data.count );
							}
						if ( data.task_status === '1' ) {
							$("#duin-count").html( data.count );
							} 
						if ( data.task_status === '2' ) {
							$("#done-count").html( data.count );
							} 
						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						}
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            }
	        });
	
	return;
	}
	
function LuvThisBoard() {
	var ZIDkey_val = $("#ZID-boards").text();
	var formsURL_call = "pages/functions/luvits_add.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  return;
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						$( "#uLuvit-badge" ).addClass( "disabled" );	
						$( "#uLuvit-badge strong" ).html( " U LuvIt!" );
						$( "#uLuvit-badge span" ).html( data.count );
						} else {
						alert( data.message );
						}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					return;
	            }
	        });
	return;
	}
/* Cloning task */
function todo_clone(zid) {
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var ZIDkey_val = $("#ZID-boards").text();
	var formsURL_call = "pages/functions/tasks_add_clone.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, ZID_key:ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						var event = $("<li />",{id:data.zid});
						var html_noslash = data.html.replace(/\\/g, '');
						event.html( html_noslash );
									
						if ( data.task_status == 0 ) {
							$('#todo-list_block').prepend(event);
							$("#todo-count").html( data.count );
							}
						if ( data.task_status == 1 ) {
							$('#duin-list_block').prepend(event);
							$("#duin-count").html( data.count );
							}
						if ( data.task_status == 2 ) {
							$('#done-list_block').prepend(event);
							$("#done-count").html( data.count );
							} 

						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						}
						$("#ajax-loader"+zid).hide();
						$(".tools").removeAttr("style");
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
					$(".tools").removeAttr("style");
	            }
	        });
	return;
	}
function todo_clone_timeline(zid) {
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var ZIDkey_val = $("#ZID-boards").text();
	var formsURL_call = "pages/functions/tasks_add_clone.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, ZID_key:ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						alert( "Yay! The task is Pindu'ed and available to you now." );
						document.location.reload(true);
						} else {
						alert( data.message );
						$('.alert').show();
						$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
						$("#ajax-loader"+zid).hide();
						}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
	            }
	        });
	return;
	}
function todo_timeline_addVideo(zid) {
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var ZIDkey_val = $("#video-body-"+zid).val();
	if (ZIDkey_val.length == 0)  window.location.reload();
	var formsURL_call = "pages/functions/photos_videos_add.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, filename_photos:ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						alert( "Yay! The video link was added." );
						//alert( data.message );
						//console.log(data);
						document.location.reload(true);
						} else {
						alert( data.message );
						console.log(data);
						$('.alert').show();
						$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
						$("#ajax-loader"+zid).hide();
						}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader"+zid).hide();
	            }
	        });
	return;
	}
/*	Add new comment 				
	$("#new-comment").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#add-new-comment" ).trigger( "click" );
          }
		});			*/
		$("#add-new-comment").click(function(e) {
                    e.preventDefault();
                    //Get value and make sure it is not null
                    var ZIDkey_val = $("#ZID-tasks").text();
                    var todo_val = $("#new-comment").val();
                    if (todo_val.length == 0) {
						$('.alert').show();
						$('#new-todo-alert').html( "You must enter a message." );
                        return;
                    }
			$('.alert').hide();
			$("#ajax-loader-add").show();
			var formsURL_call = "pages/functions/comments_add.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { id_tasks : xZID, title :  todo_val, ZID_key : ZIDkey_val },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
					
					var event = $("<div />",{id:data.zid});
					event.html( data.html );
									
                    $('#chat-box').prepend(event);
					$("#ajax-loader-add").hide();
					//Remove event from text input
					$("#new-comment").val("");
					$('#new-comment').attr("placeholder", "Type message ..." );				   
					} else {
					$('.alert').show();
					$('#new-todo-alert').html( data.message );
					$("#ajax-loader-add").hide();
					}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Give us feedback." );
					$("#ajax-loader-add").hide();
					$(".tools").removeAttr("style");
	            }
	        	});
		return;
		});