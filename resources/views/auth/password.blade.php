@extends('layout')
@section('title')
{{ Inspiring::quote() }}
@stop
@section('header_title')
Forgot your password?
@stop
@section('header_subtitle')
No problem, enter the email address you signed up with and we will send you a link to reset your password.
@stop
@section('body')
{!! Form::open(array('url' => '/password/email', 'method' => 'post', 'class' => 'col s12')) !!}
						<div class="row">
						  <div class="input-field col s6 offset-s3 ">
							<i class="material-icons prefix">account_circle</i>
							{!! Form::text('email','', array('class' => 'validate', 'data-success' => 'right')) !!}
							{!! Form::label('email', 'E-Mail', array('data-error' => 'not ok', 'data-success' => 'ok')) !!}
						  </div>
						</div>

						<div class="row">
							<div class="col s6 offset-s3">
							{!! Form::submit('Send Password Reset Link', array('class' => 'btn btn-primary')) !!}
							</div>
						</div>
{!! Form::close() !!} 
@endsection
