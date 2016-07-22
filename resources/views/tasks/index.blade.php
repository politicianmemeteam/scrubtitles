@extends('layout')
@section('title')
Inspire. Be inspired.
@stop
@section('header_title')
To Do. Doing. Done.
@stop
@section('header_subtitle')
Start moving
@stop
@section('calltoaction')
<a href="#" id="download-button" onclick="$('.active').toggleClass('hide')" class="btn-large waves-effect waves-light orange">Filter One</a>
<a href="#" id="download-button" onclick="$('.active').toggleClass('hide')" class="btn-large waves-effect waves-light orange">Filter Two</a>
<a href="#" id="download-button" onclick="$('.active').toggleClass('hide')" class="btn-large waves-effect waves-light orange">Filter Three</a>
<a href="#" id="download-button" onclick="$('.active').toggleClass('hide')" class="btn-large waves-effect waves-light orange">Filter Three</a>
@stop
@section('body')
@forelse ($tasks as $task)
    <li>{{ $task->id }}</li>
@empty
    <p>No Tasks yet!</p>
@endforelse
@stop