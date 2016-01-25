@extends('layout')

@section('body')


  <div class="container">
    <div class="section">
      <div class="row">
	  Members Info
	  @foreach ($membersInfo as $memberInfo)
		<p>{{ $memberInfo }}
		
		{{-- commented out for array test {{ $memberInfo->username }} has the real name {{ $memberInfo->fullname }} --}}</p>
	  @endforeach
      </div>	<!--   End Row       -->
    </div>    	<!--   End Section   -->
    <div class="section">
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large red">
      <i class="large material-icons">mode_edit</i>
    </a>
    <ul>
      <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></i></a></li>
      <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
      <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
      <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
    </ul>
  </div>
     <div class="row">
        <div class="col s12 m7">
		  <div class="card">
			<div class="card-image waves-effect waves-block waves-light">
			  <img class="activator" src="images/peggy_penguin_2.png">
			</div>
			<div class="card-content">
			  <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
			  <p><a href="#">This is a link</a></p>
			</div>
			<div class="card-reveal">
			  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
			  <p>Here is some more information about this product that is only revealed once clicked on.</p>
			</div>
		  </div>
        </div>
     </div>	<!--   End Row       -->
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
<div class="video-container no-controls">
          <iframe width="853" height="480" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0;autohide=1" frameborder="0" allowfullscreen></iframe>
        </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>

		</div>
        <div class="col s12 m7 l6">
          <div class="card large">
            <div class="card-image">
              <img src="images/peggy_penguin_2.png">
              <span class="card-title orange-text text-darken-2">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </div>    	<!--   End Section   -->
  </div>      	<!--   End Container -->


 @stop