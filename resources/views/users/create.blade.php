@extends('layout')
@section('title')
Add Admin User
@stop
@section('header_title')
{{ Inspiring::quote() }}
@stop
@section('body')
{!! Form::open(array('url' => 'users', 'method' => 'post', 'class' => 'col s12')) !!}
            <div class="row">
              <div class="input-field col s12 m5 offset-m1 ">
				<i class="material-icons prefix">account_circle</i>
				{!! Form::text('email','', array('class' => 'validate')) !!}
				{!! Form::label('email', 'E-Mail', array('data-error' => 'not ok', 'data-success' => 'ok')) !!}
              </div>
              <div class="input-field col s12 m5 offset-m1 ">
				<i class="material-icons prefix">group</i>
				{!! Form::text('username','', array('id' => 'username')) !!}
				{!! Form::label('username', 'Public Profile Name') !!}

              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m5 offset-m1 ">
				<i class="material-icons prefix">vpn_key</i>
                <input id="password" name="password" type="password">
                <label for="password">Password</label>
              </div>
              <div class="input-field col s12 m5 offset-m1 ">
				<i class="material-icons prefix">replay</i>
                <input id="password_confirmation" name="password_confirmation" type="password">
                <label for="password_confirmation">Confirm Password</label>
              </div>
            </div>
	<div class="row">
		<div class="col s12 m6 right">
		{!! Form::button('Register', array( 'type' => 'submit', 'class' => 'btn btn-primary')) !!}
		</div>
	</div>	
{!! Form::close() !!} 
@stop
