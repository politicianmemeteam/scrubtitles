<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use DB;
use App\User;

use Illuminate\Http\Request;

class ZvoizbitzController extends Controller {
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
        public function __construct(Request $request)
	{
                $this->middleware('auth');

		$this->request = $request;
		$this->user = $this->request->user();

	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
            //
            $records = DB::select('select * from voizbitZ');
            return view('bitz.index',compact('records'));
        }

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
            //
            $bitz = DB::table('voizbitZ')->where('bitZID',$id)->get();
            
            dd($id, $bitz[0]->uri, $bitz);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
            dd($id);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
