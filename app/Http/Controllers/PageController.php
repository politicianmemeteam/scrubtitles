<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use DB;

class PageController extends Controller {

    public function index()
    {
        // Welcome to Pinduin Landing page and Intro
	/*	$photos = DB::select('select fullname from members where id_users = ?', [4]);
		echo $photos[0]->fullname;
		foreach ($photos as $photo) :
echo $photo->fullname;
endforeach;

		var_dump($photos) ;
		exit;
		$name = DB::table('members')->where('id_users', '4')->pluck('fullname');
		echo $name;*/
		$userscount = DB::select('select count(*) as count from users where status = ?', ['Y']);
		$pinduinscount = $userscount[0]->count;
//var_dump($userscount);
//exit;
		
	//	return view('pages.welcome',compact('pinduinscount')); //
	return		"Welcome to my static pages like my blog, about, contact, and feedback pages.";
    }
    public function login()
    {
        // Just testing
		return view('pages.login');
    }
    public function about()
    {
        // Just testing
		return "About my website";
    }
    public function home()
    {
        // Just testing
		$members = ['Coach', 'Infamusk72', 'The General'];
		//$members = DB::select('select * from members where type = ?', ['earlybird']);
		//$users = DB::select('select * from users where status = ?', ['Y']);
		//$membersInfo = DB::select('select * from users, members where users.id = members.id_users and users.status = ?', ['Y']);
//		return view('members.home',compact('membersInfo'));
		return		"Meet some Pinduins:  ". implode( ',', $members);

    }
}
