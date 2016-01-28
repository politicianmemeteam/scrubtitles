<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller {

    
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
            $users = DB::select('select * from users');
            return view('users.index',compact('users'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
           
            return view('users.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
                $this->validate($this->request, ['username' => 'required']);
                $this->validate($this->request, ['email' => 'required']);
                $this->validate($this->request, ['password' => 'required']);
		User::create([
			'username' => $this->request->username,
			'email' => $this->request->email,
			'password' => bcrypt($this->request->password),
		]);                 
                
        \Session::flash('flash_message', 'User created.');
        return redirect('home');        

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
            dd($id);
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
        $id->delete();
        return redirect('home');

	}

}
