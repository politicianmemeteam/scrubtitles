@extends('ccmashup.layout')
@section('title')
polimemeteam
@stop

@section('body')
<div class="row">
  @foreach ($genres_info as $genre_info => $info)
  <div id="{{ $genre_info }}" class="hide" >
  </div>
  @endforeach
  <div class="col s12 card swipescrub">
      <video id="video" class="responsive-video" controls autoplay="1" muted preload="metadata">
        <source src="http://pinduin.com/images/waddlehelp.mp4" type="video/mp4">
        {{--<source src="{{ $videos_random[0] }}" type="video/mp4">--}}
        <track label="{{ $single_genre_info['genres'][0] }}" kind="subtitles" srclang="en" 
          src="{{ $genre_single[0]['title_url'] }}" default>
      @foreach ($genres_info as $genre_info => $info)
        @foreach ( $info as $track)
        <track label="{{ $genre_info }}" kind="{{ $track['kind'] }}" 
          srclang="{{ $track['lang'] }}" src="{{ $track['title_url'] }}" >
        @endforeach
      @endforeach

        {{-- local testing video <source src="http://pinduin.com/images/waddlehelp.mp4" type="video/mp4"> 
        <track label="horror" kind="subtitles" srclang="en" src="{{ url('ccmashup/testcopy.vtt') }}" default>
        <track label="horror" kind="subtitles" srclang="en" src="{{ url('subtitle/zroot/test01.vtt') }}" >
        <track label="romance" kind="subtitles" srclang="da" src="/ccmashup/subtitles/romance/romance.vtt" >--}}
      </video>
    <div class="card-content hide">    
      <div id="video-controls" class="controls" >
        <a class="play" ><i class="material-icons">play_circle_outline</i></a>
        <a class="pause" ><i class="material-icons">stop</i></a>
      </div>
      <div class="progress col s8">
      <div class="determinate" style="width: 70%"></div>
      </div>
    </div>
  </div>      
</div>
@foreach ($videos_all as $video)
<div class="row hide" >
  <div class="col s12 card ">
      <video id="video" class="responsive-video" controls muted preload="metadata">
        <source src="{{ $video }}" type="video/mp4">
        <track label="horror" kind="subtitles" srclang="en" src="{{ url('ccmashup/testcopy.vtt') }}" default>
        <track label="horror" kind="subtitles" srclang="en" src="{{ url('subtitle/zroot/test01.vtt') }}" >
        <track label="romance" kind="subtitles" srclang="da" src="/ccmashup/subtitles/romance/romance.vtt" >
      </video>
    <div class="card-content hidden">    
      <div id="video-controls" class="controls" >
        <a class="play" ><i class="material-icons">play_circle_outline</i></a>
        <a class="pause" ><i class="material-icons">stop</i></a>
      </div>
      <div class="progress col s8">
      <div class="determinate" style="width: 70%"></div>
      </div>
    </div>
  </div>      
</div>
@endforeach
{{-- 

  This is a bunch of local debug testing of Tracks

  <div class="row">
  @foreach ($genres as $genre)
  <div class="col s12 card">
    <div id="{{ $genre }}" class="card-content">
      @foreach ($text[$genre] as $track)
      <li>
      <span class="duration" >{{ $track['duration'] }}</span>   
      <span class="start" >{{ $track['start'] }}</span>   
      <span class="end" >{{ $track['end'] }}</span>   
      <span class="text" >This is a new {{ $genre }} text: {{ $track['text'] }}</span>   
      </li>
      @endforeach
      <a href="#!" onclick="test2();" title="Play Test">
        <i class="material-icons right">play_circle_outline </i>
      </a>
    </div>
  </div>
  @endforeach
</div>

<div class="row">
 <div class="col s12 m6 offset-m3 card">
    <div class="card-image">
  <figure id="videoContainer3" data-fullscreen="false">
    <video id="video3" controls preload="metadata">
      <source src="http://stm.dam.digizuite.dk/dmm3bwsv3/372_10032_10001_1_2_0_6e5d6f10-e316-43e4-8fef-e33d36336140.mp4?635885556265320000" type="video/mp4">
      <track label="English" kind="subtitles" srclang="en" src="/ccmashup/subtitles/textVTT.vtt" default>
      <track label="Deutsch" kind="subtitles" srclang="de" src="/ccmashup/subtitles/textVTT.vtt">
      <track label="Español" kind="subtitles" srclang="es" src="/ccmashup/subtitles/textVTT.vtt">
    </video>
  </figure>
    </div>
    <div class="card-content">content</div>
    <div class="card-action">action</div>

 </div>
</div>

<div class="row">
 <div class="col s12 card">
  <figure id="videoContainer" data-fullscreen="false">
    <video id="video" controls preload="metadata" autoplay="1" muted >
      <source src="http://stm.dam.digizuite.dk/dmm3bwsv3/372_10032_10001_1_2_0_6e5d6f10-e316-43e4-8fef-e33d36336140.mp4?635885556265320000" type="video/mp4">
      <track label="English" kind="subtitles" srclang="en" src="/ccmashup/subtitles/textVTT.vtt" default>
      <track label="Deutsch" kind="subtitles" srclang="de" src="/ccmashup/subtitles/textVTT.vtt">
      <track label="Español" kind="subtitles" srclang="es" src="/ccmashup/subtitles/textVTT.vtt">
    </video>

  </figure>
    <div class="card-content">    
      <div id="video-controls" class="controls" data-state="hidden">
        <a id="playpause" data-state="play"><i class="material-icons">play_circle_outline</i></a>
        <a id="stop" data-state="stop"><i class="material-icons">stop</i></a>
      </div>
    </div>
    <div class="card-action">
      <div class="progress">
        <progress id="progress" value="0" min="0">
          <span id="progress-bar"></span>
        </progress>
      </div>
      <button id="mute" type="button" data-state="mute">Mute/Unmute</button>
      <button id="volinc" type="button" data-state="volup">Vol+</button>
      <button id="voldec" type="button" data-state="voldown">Vol-</button>
      <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>
      <button id="subtitles" type="button" data-state="subtitles">CC</button>
    </div>  
 </div>
</div>
--}}
@stop
@section('body2')
<a href="#openModal">Open Modal</a>

<div id="openModal" class="modalDialog">
  <div>
    <a href="#close" title="Close" class="close">X</a>
    <h2>Modal Box</h2>
    <p>This is a sample modal box that can be created using the powers of CSS3.</p>
    <p>You could do a lot of things here like have a pop-up ad that shows when your website loads, or create a login/register form for users.</p>
  </div>
</div>
@stop
