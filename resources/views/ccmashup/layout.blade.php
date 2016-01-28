<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>@yield('title') | ccMashup</title>

  <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" >
  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/ccmashup/css/styles.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="{{ url('/') }}" class="brand-logo">SCRUBTITLES</a>
	@if (Auth::guest())
      <ul class="right hide-on-med-and-down hide">
        <li><a href="{{ url('/home') }}">Log In</a></li>
        <li><a href="{{ url('/auth/register') }}">Register</a></li>
      </ul>
		
			
      <ul id="nav-mobile" class="side-nav hide">
        <li><a href="{{ url('/home') }}">Log In</a></li>
        <li><a href="{{ url('/auth/register') }}">Register</a></li>
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

  <div class="container">
    <div class="section">
  	@yield('body')
    </div>
    <div class="section">
  	@yield('body2')
    </div>
    <br><br>
  </div>

{{-- Messages Container --}}
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
{{-- Messages Container END --}}
  <!--  Scripts-->
  <script src="/ccmashup/js/vendor/jquery-2.1.4.min.js"></script>
        <!-- touchSwipe -->
        <script type="text/javascript" src="/ccmashup/js/jquery.touchSwipe.min.js"></script>
        <!-- Discover  -->
        {{-- Messages Container END --}}
  {{--<script type="text/javascript" src="/ccmashup/js/video-player.js"></script>
       <script src="/ccmashup/js/vendor/shake.js"></script>
        <script type="text/javascript" src="/ccmashup/js/main.js"></script>
        <script type="text/javascript" src="/ccmashup/js/scrubr.js"></script>--}}
        <script type="text/javascript" src="/ccmashup/js/scrubr_klh.js"></script>
  <script src="/js/materialize.min.js"></script>
  <script src="/js/init.js"></script>

  </body>
</html>
