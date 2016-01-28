@extends('layout')
@section('title')
Inspire. Be inspired.
@stop
@section('header_title')
Making vids happier & healthier
@stop
@section('header_subtitle')
using subtitles & technology.
@stop
@section('body')
<?php /*	<script>
 	 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-40625434-3', 'auto');
	  ga('send', 'pageview');
	  
	  	  
	    var _gaq = _gaq || [];
	    _gaq.push(['_setAccount', 'UA-40625434-3']);
	    _gaq.push(['_trackPageview']);

	    (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>	*/
?>
      <!--   Icon Section   -->
      <div class="row">
          <div class="col s12 card swipescrub">
		      <video id="video" class="responsive-video" controls autoplay="1" muted preload="metadata">
		        <source src="http://pinduin.com/images/waddlehelp.mp4" type="video/mp4">
		        <track label="horror" kind="subtitles" srclang="en" src="{{ url('/ccmashup/subtitles/romance/romance.vtt') }}" default>
		      </video>
          </div>
      </div>
@stop