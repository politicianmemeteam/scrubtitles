<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {

	//
	protected $fillable = [
		'status',
		'id_users',
		'type',
		'title',
		'description',
		'url',

	];

}
