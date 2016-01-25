@include('common.layout_head')
<body>
<div class="navbar-fixed">
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="#" class="brand-logo">Voicebits Apps</a>
      <div id="navispinner" class="preloader-wrapper ">
        <div class="spinner-layer spinner-yellow-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
	@if (Auth::guest())
      <ul class="right hide-on-med-and-down">
        <li><a href="{{ url('/auth/login') }}">Log In</a></li>
        <li><a href="{{ url('/auth/register') }}">Register</a></li>
      </ul>
		
			
      <ul id="nav-mobile" class="side-nav">
        <li><a href="{{ url('/auth/login') }}">Log In</a></li>
        <li><a href="{{ url('/auth/register') }}">Register</a></li>
      </ul>
	@else
      <ul class="right hide-on-med-and-down">
        <li><a href="{{ url('/home') }}"><i class="material-icons">home</i></a></li>
        <li><a href="{{ url('/auth/logout') }}"><i class="material-icons left">brightness_3</i>Logout</a></li>
      </ul>
		
			
      <ul id="nav-mobile" class="side-nav">
        <li><a href="{{ url('/home') }}"><i class="material-icons">home</i></a></li>
        <li><a href="{{ url('/auth/logout') }}"><i class="material-icons">brightness_3</i></a>Log Out</li>
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
{{-- 
layout of the content is container/section/row(1...x)
Two main content areas that are customizable: body and body2
Content areas must start with div row if there are many rows in the body, else can start with content.
--}}
  <div class="container">
    <div id="body_tab1" class="section">
	@yield('body')
    </div>
    <div id="body_tab2" class="section">
	@yield('body2')
    </div>
    <br><br>
  </div>
  @include('common.base_js')
  </body>
</html>
