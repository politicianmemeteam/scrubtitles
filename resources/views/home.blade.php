@extends('layout')
@section('title')
Inspire. Be inspired.
@stop
@section('header_title')
{{ Inspiring::quote() }}
@stop
@section('header_subtitle')
You are logged in {{ Auth::user()->username }}.
@stop
@section('body')

    <div class="section">
      <!--   Icon Section   -->
      <div class="row">
        <div class="col s12 m6 offset-m3">
            <ul class="collection with-header">
              <li class="collection-header"><h4>Voicebits Apps Admin</h4></li>
              <li class="collection-item">
                  <div>Users<a href="{{ action('UsersController@index') }}" class="secondary-content"><i class="material-icons">send</i></a></div>
              </li>
            </ul>
        </div>
        <div class="col s12 m6 offset-m3">
            <ul class="collection with-header">
              <li class="collection-header"><h4>voicebitz Tables</h4></li>
              <li class="collection-item">
                  <div>Userz<a href="{{ action('HomeController@userz') }}" class="secondary-content"><i class="material-icons">send</i></a></div>
              </li>
              <li class="collection-item">
                  <div>Voizbitz<a href="{{ action('HomeController@voizbitz') }}" class="secondary-content"><i class="material-icons">send</i></a></div
              </li>
              <li class="collection-item">
                  <div>Cloudz<a href="{{ action('HomeController@cloudz') }}" class="secondary-content"><i class="material-icons">send</i></a></div>
              </li>
              <li class="collection-item">
                  <div>Peepz<a href="{{ action('HomeController@peepz') }}" class="secondary-content"><i class="material-icons">send</i></a></div>
              </li>
            </ul>
        </div>

      </div>

    </div>
@stop