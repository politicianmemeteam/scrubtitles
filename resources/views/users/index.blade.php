@extends('common.layout')
@section('title')
Inspire. Be inspired.
@stop
@section('body')
<div class="row">
    <a href="{{ action('UsersController@create') }}" class="waves-effect waves-light btn">Add New User</a>
</div> 
@stop
@section('body2')
<div class="row">
    <ul class="collection">
@foreach ($users as $user)
        <li class="collection-item dismissable">
            <div>{{ $user->username }}
                <a href="{{ action('UsersController@show', [$user->id]) }}" class="secondary-content"><i class="material-icons">send</i></a>
                {!! Form::open(['action' => ['UsersController@destroy', $user->id], 'method' => 'delete']) !!}
                  {!! Form::submit('delete', ['class'=>'red material-icons']) !!}
                {!! Form::close() !!}                
            </div>
        </li>
@endforeach 
    </ul>
</div>
@stop