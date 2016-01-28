<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\User;
use Illuminate\Http\Request;

class ZuserzController extends Controller {

    
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
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
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
                $users = DB::select('select * from userZ, memberZ where userZ.userZID = memberZ.userZID and userZ.userZID = ?',[$id]);
                //dd($users, $users[0]->username);
                $username = $users[0]->username;
                return view('userz.edit', compact('id','users','username'));

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
            
            DB::table('userZ')
                    ->where('userZID', $id)
                    ->update([
                        'fullname' => $this->request->fullname,
                        'username' => $this->request->username,
                        'email' => $this->request->email,
                        'status' => $this->request->status
                        ]);
            DB::table('memberZ')
                    ->where('userZID', $id)
                    ->update([
                        'acct_type' => $this->request->acct_type,
                        'displayname' => $this->request->displayname
                        ]);            
            //dd($this->request, $this->request->fullname, $id);
            return redirect('userz');

         
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
