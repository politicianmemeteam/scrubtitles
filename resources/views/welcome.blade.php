@extends('layout')
@section('title')
Inspire. Be inspired.
@stop
@section('header_title')
Making videos happier & healthier
@stop
@section('header_subtitle')
using sports & technology to build creative learning environments.
@stop
{{-- @section('calltoaction')
<a href="#" id="download-button" class="btn-large waves-effect waves-light orange">Get Started</a>
@stop --}}
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
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center">Improving relationships.</h5>

            <p class="light">We value loyalty.</p>
			<p class="light">We take time to build, nurture, and reflect over our most important relationships.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">alarm_on</i></h2>
            <h5 class="center">Saving time.</h5>

            <p class="light">We value time.</p>
			<p class="light">We are improving communication one classroom at a time and providing a simple way to grow, learn, and give back to the world, all at the same time.</p>
         </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">mood</i></h2>
            <h5 class="center">Having the fun times of our life.</h5>

            <p class="light">We value fun and community.</p>
			<p class="light">We have fun along the way with our family, our friends, and all our loved ones and we take time to become better citizens of our changing communities.</p>
          </div>
        </div>
      </div>


@stop