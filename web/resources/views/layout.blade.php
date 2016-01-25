<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>@yield('title') | Voicebits Apps</title>

  <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" >
  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="{{ url('/') }}" class="brand-logo">Voicebits Apps</a>
	@if (Auth::guest())
      <ul class="right hide-on-med-and-down">
        <li><a href="{{ url('/home') }}">Log In</a></li>
      </ul>
		
			
      <ul id="nav-mobile" class="side-nav">
        <li><a href="{{ url('/home') }}">Log In</a></li>
      </ul>
	@else
      <ul class="right hide-on-med-and-down">
        <li><a href="{{ url('/home') }}"><i class="material-icons">home</i></a></li>
        <li><a href="{{ url('/auth/logout') }}">Logout</a></li>
      </ul>
		
			
      <ul id="nav-mobile" class="side-nav">
        <li><a href="{{ url('/home') }}"><i class="material-icons">home</i></a></li>
        <li><a href="{{ url('/auth/logout') }}"></a>Log Out</li>
      </ul>
	@endif
		  
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
    </div>
  </nav>
  <div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <br><br>
      <h1 class="header center orange-text">@yield('header_title')</h1>
      <div class="row center">
        <h5 class="header col s12 light">@yield('header_subtitle')</h5>
      </div>
      <div class="row center">
	  @yield('calltoaction')
        
      </div>

{{--       <br><br>
--}}
    </div>
  </div>

<?php
 //@yield('header_head);
//@yield('header_nav);
//@yield('footer_foot);
?>
  <div class="container">
   <div class="section">
            <div class="row">

					@if (count($errors) > 0)
						<div class="col s6 offset-s3 card-panel red darken-1 white-text text-darken-1">
							<h5>Whoops!</h5>
							<p>There were some problems with your input.</p>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif
			</div>
    </div>
  </div>
  <div class="container">
    <div class="section">
	@yield('body')
    </div>
    <div class="section">
	@yield('body2')
    </div>
    <br><br>
  </div>


<?php 
		$UserInfo = Auth::user();
		$userstatus = ($UserInfo['attributes']['status'] == 'Y') ? true : false;
?>
@if (!$userstatus)

  <footer class="page-footer orange">
    <div class="container">
        <div class="row">
		  <div class="col l6 s12">
			<h5 class="white-text">Dream big and chase with great passion.</h5>
			<p class="grey-text text-lighten-4">Our vision is to be the most awesome software development company...ever!  Read more about why we believe <a class="grey-text text-lighten-3" href="http://wp.me/P4WFWL-4i">"There is only one good reason to be a software development company" here</a>.  Or check out <a class="grey-text text-lighten-3" href="http://infamusk72.com">the blog here</a> to follow our journey.

			</p>
		  </div>

		  <div class="col l4 offset-l2 s12">
			<h5 class="white-text">Visit our apps</h5>
			<ul>
			  <li><a class="grey-text text-lighten-3" href="http://pinduin.com">Pinduin</a></li>
			  <li><a class="grey-text text-lighten-3" href="http://www.voicebitz.com">voicebitz</a></li>
			  <li><a class="grey-text text-lighten-3" href="http://www.shoutnout.com">Shout'n Out!</a></li>
			  <li><a class="grey-text text-lighten-3" href="http://zayawhat.voicebitz.com">Story Venture</a></li>
			  <li><a class="grey-text text-lighten-3" href="http://zolomotion.voicebitz.com">Zolo Motion</a></li>
			</ul>
		  </div>
		  
        </div>
    </div>
    <div class="footer-copyright">
      <div class="container">

      © <?php echo date("Y"); ?><a class="orange-text text-lighten-3" href="http://www.voicebits.com"> Voicebits Apps</a>
      </div>
    </div>
  </footer>
@endif

  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <!-- touchSwipe -->
        <script type="text/javascript" src="/js/AdminLTE/js/plugins_custom/jquery.touchSwipe.min.js"></script>
        <!-- Discover  -->
        <script type="text/javascript" src="/js/AdminLTE/js/plugins_custom/discover.js"></script>
  <script src="/js/materialize.min.js"></script>
  <script src="/js/init.js"></script>

  </body>
</html>
