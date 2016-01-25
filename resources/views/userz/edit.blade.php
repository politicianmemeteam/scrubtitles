@extends('common.layout_forms')
@section('title')
Inspire. Be inspired.
@stop
@section('body')
<div class="row">
  <div class="col s12 m8 offset-m2">
    <h3 class="light-blue-text">Edit User/Member Info</h3>
    {!! Form::open(array('url' => ['userz', $id], 'method' => 'PATCH', 'class' => 'col s12')) !!}
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          {!! Form::text('username', $users[0]->username) !!}
          {!! Form::label('username', 'Username' ) !!}
        </div>
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          {!! Form::text('fullname', $users[0]->fullname) !!}
          {!! Form::label('fullname', 'Full Name' ) !!}
        </div>
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          {!! Form::text('displayname', $users[0]->displayname) !!}
          {!! Form::label('displayname', 'Display name' ) !!}
        </div>    
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          {!! Form::text('email', $users[0]->email) !!}
          {!! Form::label('email', 'E-mail' ) !!}
        </div>    
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          {!! Form::textarea('status', $users[0]->status) !!}
          {!! Form::label('status', 'Status') !!}
        </div>
        <div class="input-field col s4 offset-s1">
          {!! Form::select('acct_type', [0,1,2,9], $users[0]->acct_type) !!}
          {!! Form::label('acct_type', 'User Account Type') !!}
        </div>
        <div class="col s6 offset-s1">
        {!! Form::button('Save', array( 'type' => 'submit', 'class' => 'btn btn-primary')) !!}
        </div>
    {!! Form::close() !!}
        <div class="col s6 offset-s6">
          <a href="{{ url('userz') }}">Cancel</a>
        </div>        
  </div>
</div>
@stop
