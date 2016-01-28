@extends('common.layout')
@section('title')
Inspire. Be inspired.
@stop
@section('body')
<div class="row">
    <ul class="collection">
@foreach ($records as $record)
        <li class="collection-item dismissable">
            <div>{{ $record->memberZID_owner." ".$record->memberZID_contact." ".$record->title_contact }}
                <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
            </div>
        </li>
@endforeach 
    </ul>
</div>
@stop