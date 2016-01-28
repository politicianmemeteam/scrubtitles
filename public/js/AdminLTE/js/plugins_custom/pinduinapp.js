/* js common included for all pinduin pages - keep this small and lite */
// Google Analytics
$( '#add-new-waddle' ).click(function() { _gaq.push(['_trackEvent', 'add-new-waddle', 'clicked']);	});

// this is for getting window paths ie. http://www.voicebitz.com/one/two/three.php	
var pathArray = window.location.pathname.split( '/' );  // split up the path
var secondLevelLocation = pathArray[0];		// returns one
var pathprotocol = window.location.protocol; 	// returns http
var pathhost = window.location.host;	// returns www.voicebitz.com
var pathwithouthost = window.location.pathname;  // returns one/two/three.php
var countPath = pathArray.length;
var urlParams;

			/* Get window params on new window calls */
			(window.onpopstate = function () {
	 		   var match,
			        pl     = /\+/g,  // Regex for replacing addition symbol with a space
 			       search = /([^&=]+)=?([^&]*)/g,
			        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
 			       query  = window.location.search.substring(1);

			    urlParams = {};
			    while (match = search.exec(query))
			       urlParams[decode(match[1])] = decode(match[2]);
				/* Creates object:
					urlParams = {
					enc: " Hello ",
					i: "main",
					mode: "front",
					sid: "de8d49b78a85a322c4155015fdce22c4",
					empty: ""
					}
					*/
				// Example call - alert(urlParams["mode"]); returns value of param OR alert("empty" in urlParams); returns true if the param is passed but is empty
	
				})();

$( document ).ready(function() {
	if (urlParams['action'] == 'feedback') {
		if ($( '#usernameError' ).len >= 0 ) {
			$( '#usernameError' ).html( '<i class="fa fa-times-circle-o"></i> You must sign in to see the Feedback board.' );
			$( '#usernameError' ).show();
			}
		}
	});
function search_keyword() {
	var MIN_LENGTH = 1;
	var keyword = $("#keyword").val();
	if (keyword.length >= MIN_LENGTH) {
		$.get( "pages/functions/search_autocomplete.php", { keyword: keyword } )
			  .done(function( data ) {
			   // console.log(data);
				if (data) {
					$('#results').html('');
					$('#results').append(data['html']);
					$('#results').show();	
					}
				});
		} else {
		$('#results').hide();	
		}
	}
	
	
function goto_board(zid) {
	$("#ajax-loader"+zid).show();
	window.location="./?page=boards&action=detail&zid="+zid+"&sts=0";
	}
function goto_timeline(zid) {
	$("#ajax-loader"+zid).show();
	window.location="./?page=boards&action=activity&zid="+zid;
	}
function goto_timeline_detail(zid,zfilter) {
	$("#ajax-loader"+zid).show();
	window.location="./?page=boards&action=activity&zid="+zid+"&zfltr="+zfilter;
	}
function todo_comment(zid) {
	if ($("#ajax-loader"+zid).len >= 0) {
		$("#ajax-loader"+zid).show();
		} else {
		$("#ajax-loader-add").show()	
		}
	window.location.assign("./?page=comments&action=view&zid="+zid);
	}
function todo_photo(zid) {
	$("#ajax-loader"+zid).show();
	window.location.assign("./?page=photos&action=add&zid="+zid);
	}
function goto_photo(zid) {
	$("#ajax-loader"+zid).show();
	window.location.assign("./?page=photos&action=view&zid="+zid);
	}
function goto_commentsAll(zid) {
	$("#ajax-loader-add").show();
	window.location.assign("./?page=comments&action=view&zid="+zid+"&board=y");
	}
