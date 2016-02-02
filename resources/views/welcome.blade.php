@extends('layout')
@section('title')
Swipe Swipe Shake
@stop
@section('body')
      <!--   Icon Section   -->
      <div class="row">
          <div class="col s12 card swipescrub">
		      <video id="video" class="responsive-video" controls autoplay="1" muted preload="metadata">
		        <source src="http://pinduin.com/images/waddlehelp.mp4" type="video/mp4">
		        <track label="horror" kind="subtitles" srclang="en" src="{{ url('/ccmashup/testcopy.vtt') }}" default>
		      </video>
          </div>
      </div>
@stop