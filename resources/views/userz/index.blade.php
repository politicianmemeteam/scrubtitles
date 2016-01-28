@extends('common.layout')
@section('title')
Inspire. Be inspired.
@stop
@section('body')
<div class="row">
    <ul class="collection">
@foreach ($users as $user)
        <li class="collection-item dismissable">
            <div>{{ $user->username }}<a href="{{ action('ZuserzController@edit', [$user->userZID]) }}" class="secondary-content"><i class="material-icons">send</i></a></div>
        </li>
@endforeach 
    </ul>
</div>
@stop