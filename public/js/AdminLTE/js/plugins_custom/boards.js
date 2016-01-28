	function add_waddle() {
		$( "#add-waddle" ).toggle();
		$( "#add-waddle-show" ).toggleClass( "fa-minus fa-plus");	
		}
/*	Add new waddle boards */				
	$("#new-board-title").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#add-new-board" ).trigger( "click" );
          }
		});
	$("#new-board-body").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#add-new-board" ).trigger( "click" );
          }
		});			
		$("#add-new-board").click(function(e) {
                    e.preventDefault();
                    //Get value and make sure it is not null
                    var board_title = $("#new-board-title").val();
                    var board_body = $("#new-board-body").val();
                    if (board_title.length == 0) {
						$('.alert').show();
						$('#new-todo-alert').html( "Enter a Title." );						
                        return;
                    }
			$('.alert').hide();
			$("#ajax-loader-add").show();
			var formsURL_call = "pages/functions/boards_add.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { title :  board_title, body :  board_body },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
					$('#new-board-title').attr("placeholder", "Enter a new waddle." );
					$('#new-board-body').attr("placeholder", "Here is a suggestion:  Enter a time or date when you want to do this by.  Or just add a more detailed description." );

                    if($("#0board").length != 0) $("#0board").remove();
					var event = $("<li />",{id:data.zid});
					var html_noslash = data.html.replace(/\\/g, '');
					event.html(html_noslash);
									
                    $('#my-boards').prepend(event);
					$("#ajax-loader-add").hide();
					add_waddle();
				   
					} else {
					$('.alert').show();
					$('#new-todo-alert').html(  data.message );
					$("#ajax-loader-add").hide();
					}
	            },
	            error:function(data){
					$('.alert').show();
					$('#new-todo-alert').html( "Sorry.  This action returned an error. Please provide us feedback about this so we can try to fix it for you." );
					$("#ajax-loader-add").hide();
					$(".tools").removeAttr("style");
	            }
	        	});

		//Remove event from text input
		$("#new-board-title").val("");
		$("#new-board-body").val("");
		return;
		});
function board_edit(zid) {
	$("#body-"+zid).toggle();
	}
function board_edit_save(zid) {
	var save_todo = $("#edt-board-"+zid).val();
	var save_todo_body = $("#edt-board-body-"+zid).val();
	if (save_todo.length == 0 && save_todo_body.length == 0) {
		$('.alert').show();
		$('#new-todo-alert').html( "You must enter something in one of the fields." );
		return;
		}
	
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();

	var formsURL_call = "pages/functions/tasks_update_status.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"edit", table:"boards", title:save_todo, body:save_todo_body },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						var html_noslash = data.html.replace(/\\/g, '');
						$("#"+zid+" span").first().html( html_noslash );
						} else {
						$('.alert').show();
						$('#new-todo-alert').html( data.message );
						}
						$("#ajax-loader"+zid).hide();
						$(".tools").removeAttr("style");
						board_edit(zid);
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
		
function board_delete(zid) {
	if ((window.confirm("Are you sure you want to delete? This will delete all the ToDos on the board too.")) == false) { 
  		return;
		}
	$('.alert').hide();
	$(".tools").hide();
	$("#ajax-loader"+zid).show();
	var formsURL_call = "pages/functions/tasks_update_status.php";
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { zid:zid, action:"destroy", table:"boards" },
	            statusCode: {
	                404: function() {
	                  alert("Big problem! Page not found");
					  $("#ajax-loader"+zid).hide();
					  $(".tools").removeAttr("style");
	                }
	              },
	            success: function(data){	
					if (data.bool_flag) {
						$("#"+zid).remove();
						$('#new-todo-alert').html( data.message );

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