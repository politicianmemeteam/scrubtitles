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
<div class="navbar-fixed">
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

</div>

                                @if (count($errors) > 0)
                                  <div class="container">
                                   <div class="section">
                                            <div class="row">

						<div class="col s6 offset-s3 card-panel red darken-1 white-text text-darken-1">
							<h5>Whoops!</h5>
							<p>There were some problems with your input.</p>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
                                            </div>
                                    </div>
                                  </div>
                                @endif
                                
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
