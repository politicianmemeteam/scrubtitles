<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
# Admin Login
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

# Main
Route::get('/', 'WelcomeController@index');

# CCshake aka SCRUBTITLES api routing
Route::get('subtitle/{genre}/{filename}', 'PoliMemesController@displaySubtitle');
#Route::get('video/{filename}', 'PoliMemesController@displayVideo');
Route::resource('api', 'PoliMemesController');

Route::get('api/v1/subtitle/{genre}/{filename}', 'PoliMemesController@displaySubtitle');
Route::get('api/v1/get/video/{id?}', 'PoliMemesController@getVideo');
Route::get('api/v1/get/track/{genre?}', 'PoliMemesController@getTrackInfo');
Route::get('api/v1/get/parsed/{genre}/{id}/{offset?}', 'PoliMemesController@getParsedFiles');
Route::resource('api/v1', 'PoliMemesController');

Route::post('subtitle/{filename}', 'PoliMemesController@putSubtitle');
