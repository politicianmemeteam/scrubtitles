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
Route::get('home', 'HomeController@index'); // authenticated users home

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


# Blog pages
Route::get('about', 'WelcomeController@about');
Route::get('blog', 'WelcomeController@blog');

// Model bind and Resource routes

    # Users
    Route::model('users', 'App\User');
    Route::resource('users', 'UsersController');
    
    # voicebitZ tables - Authenticated users only
    Route::get('userz', 'HomeController@userz');
    Route::get('bitz', 'HomeController@voizbitz');
    Route::get('cloudz', 'HomeController@cloudz');
    Route::get('peepz', 'HomeController@peepz');
    
    # userZ resource routing
    Route::get('userz/{id}/edit', 'ZuserzController@edit');
    Route::match(['put', 'patch'],'userz/{id}','ZuserzController@update');
    Route::delete('userz/{id}', 'ZuserzController@destroy');
    
    # voizbitZ resource routing
    Route::resource('bitz', 'ZvoizbitzController');

