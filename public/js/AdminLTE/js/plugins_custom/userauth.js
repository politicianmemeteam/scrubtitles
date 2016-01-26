/* User authentication */
$("#login-box").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#login-button" ).trigger( "click" );
          }
	});
$("#register-box").keypress(function(e) {
         if(e.which == 13) {
             e.preventDefault();
			 $( "#signup-button" ).trigger( "click" );
          }
	});
$( '#fbsigninbutton' ).click(function() { _gaq.push(['_trackEvent', 'fbsigninbutton', 'clicked']);	});
$( '#twittersigninbutton' ).click(function() { _gaq.push(['_trackEvent', 'twittersigninbutton', 'clicked']);	});
$( '#googlesigninbutton' ).click(function() { _gaq.push(['_trackEvent', 'googlesigninbutton', 'clicked']);	});

// Pinduin app
$( '#hdr-back' ).click(function() {
	$( "#ajax-loader" ).show();
	window.location.assign("./");
});
$( '#forgotpwd' ).click(function() {
	$( "#ajax-loader" ).show();
	$( '#usernameError' ).hide();
	$( '#username-box' ).removeClass('has-error');
	if ( $( "[name='username']" ).val() == '') {
		$( '#username-box' ).addClass('has-error');
		$( "#ajax-loader" ).hide();
		$( '#usernameError' ).show();
		} else {
		// ajax call and on success or error
		alert ('We sent a new password to your e-mail.');
		_gaq.push(['_trackEvent', 'forgotpassword', 'clicked']);
		$( '#usernameError' ).removeClass('has-error');
		$( '#forgotpwdError' ).toggle();
		$( "#ajax-loader" ).hide();
		}
});
$( '#signup-button' ).click(function() {
	$( "#ajax-loader" ).show();
	$( '#usernameError' ).hide();
	$( '#username-box' ).removeClass('has-error');
	$( '#password-box' ).removeClass('has-error');
	if ( $( "[name='email']" ).val() == '') {
		$( '#username-box' ).addClass('has-error');
		$( "#ajax-loader" ).hide();
		$( '#usernameError' ).show();
		return;
		}
	if ( $( "[name='username']" ).val() == '') {
		$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> Enter a user name' );
		$( '#username-box' ).addClass('has-error');
		$( "#ajax-loader" ).hide();
		$( '#usernameError' ).show();
		return;
		} else {
		var formsURL_call = "pages/functions/register.php";
		var username = $( "[name='username']" ).val();
		var email = $( "[name='email']" ).val();
		var pwd = $( "[name='password']" ).val();
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { username : username, email :  email, password :  pwd },
	            statusCode: {
	                404: function() {
	                  alert("Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
						//console.log( data.message );
						//console.log(data.dbconn);
						//alert(data.dbconn);
						//alert("./?page="+urlParams['page']+"&action="+urlParams['action']);
						if  (typeof urlParams['page'] == "undefined" || typeof urlParams['action'] == "undefined" ) {
							window.location.assign("./");								
							} else {
							window.location.assign("./?page="+urlParams['page']+"&action="+urlParams['action']);								
							}
						} else {
						$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> ' + data.message );
						$( '#username-box' ).addClass('has-error');
						$( '#password-box' ).addClass('has-error');
						$( '#usernameError' ).show();
						$( "#ajax-loader" ).hide();
						console.log( data.message );
						console.log(data.dbconn);
						}
	            },
	            error:function(data){
						$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> Is this a valid e-mail?' );
						$( '#username-box' ).addClass('has-error');
						$( '#password-box' ).addClass('has-error');
						$( '#usernameError' ).show();
						$( "#ajax-loader" ).hide();
					console.log("registration returned error");
	            }
	        });
			
		return;

		}
});
$( '#login-button' ).click(function() {

  console.log( $( "form" ).serialize() );
return;
	
	
	
	$( "#ajax-loader" ).show();
	$( '#usernameError' ).hide();
	$( '#username-box' ).removeClass('has-error');
	$( '#password-box' ).removeClass('has-error');
	if ( $( "[name='username']" ).val() == '') {
		$( '#username-box' ).addClass('has-error');
		$( "#ajax-loader" ).hide();
		$( '#usernameError' ).show();
		return;
		} else {
		var formsURL_call = "pages/functions/login.php";
		var username = $( "[name='username']" ).val();
		var pwd = $( "[name='password']" ).val();
			$.ajax({
	            url: formsURL_call,
	            type: "post",
	            dataType:"json",
				data: { username : username, password :  pwd },
	            statusCode: {
	                404: function() {
	                  alert("Page not found");
	                }
	              },
	            success: function(data){
					if (data.bool_flag) {
						//console.log( data.message );
						var pageParam = (typeof urlParams['page'] == "undefined") ? "" : urlParams['page'] ;
						var actionParam = (typeof urlParams['action'] == "undefined") ? "" : urlParams['action'] ;
						var zidParam = (typeof urlParams['zid'] == "undefined") ? "" : urlParams['zid'] ;
						var stsParam = (typeof urlParams['sts'] == "undefined") ? "" : urlParams['sts'] ;
						var tokenParam = (typeof urlParams['token'] == "undefined") ? "" : urlParams['token'] ;
						pageParam = (pageParam == "logout") ? "" : pageParam;
						
						if (pageParam != "") {
							window.location.assign("./?page="+pageParam+"&action="+actionParam+"&zid="+zidParam+"&sts="+stsParam+"&token="+tokenParam);
							} else {
							window.location.assign("./");
							}
						} else {
						$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> ' + data.message );
						$( '#username-box' ).addClass('has-error');
						$( '#password-box' ).addClass('has-error');
						$( "#ajax-loader" ).hide();
						$( '#usernameError' ).show();
						console.log( data.message );
						console.log(data.dbconn);
						}
	            },
	            error:function(data){
						$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> An error occurred. Try again later.' );
						$( '#username-box' ).addClass('has-error');
						$( '#password-box' ).addClass('has-error');
						$( "#ajax-loader" ).hide();
						$( '#usernameError' ).show();
					console.log("login returned error");
	            }
	        });
			
		return;
		}
});

// Facebook authentication
// Twitter authentication
// Google+ authentication
// Instagram authentication
