<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home');
	}

	/**
	 * Display a listing of the voicebitZ tables.
	 * tables have a capital Z even though in db it is not this is for prod
         * 
	 * @return Response
	 */
	public function userz()
	{
		//
            $users = DB::select('select * from userZ');
            return view('userz.index',compact('users'));
	}
	public function voizbitz()
	{
		//
            $records = DB::select('select * from voizbitZ');
            return view('bitz.index',compact('records'));
	}
	public function cloudz()
	{
		//
            $records = DB::select('select * from cloudZ');
            return view('cloudz.index',compact('records'));
	}
	public function peepz()
	{
		//
            $records = DB::select('select * from peepZ');
            return view('peepz.index',compact('records'));
	}        

}
