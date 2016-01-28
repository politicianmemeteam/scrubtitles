@extends('layout')
@section('title')
{{ Inspiring::quote() }}
@stop
@section('header_title')
{{ Inspiring::quote() }}
@stop

@section('body')
{!! Form::open(array('url' => '/auth/login', 'method' => 'post', 'class' => 'col s12')) !!}
            <div class="row">
              <div class="input-field col s6">
				<i class="material-icons prefix">account_circle</i>
                <input id="email" type="email" class="validate" name="email" value="{{ old('email') }}" autofocus >
                <label for="email" data-error="wrong" data-success="ok">Email</label>
            </div>

            <div class="input-field col s6">
								<i class="material-icons prefix">vpn_key</i>
								<input id="icon_password" type="password" name="password">
							<label for="icon_password" class="col-md-4 control-label">Password</label>
						</div>
			</div>

            <div class="row">
				<div class="col-s6 right">
					{!! Form::button('Login', array( 'type' => 'submit', 'class' => 'btn btn-primary')) !!}
					<br>
					<br>
					<input type="checkbox" class="filled-in" id="remember" name="remember" checked="checked" />
						  <label for="remember">Remember Me</label>
					<br>
					<a class="grey-text text-darken-1" href="{{ url('/password/email') }}">Forgot Your Password?</a>
				</div>
			</div>
{!! Form::close() !!} 
@stop
