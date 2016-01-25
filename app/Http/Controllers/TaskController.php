<?php namespace App\Http\Controllers;

use App\Task;
use DB;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class TaskController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	//
	public function index()
	{
/* Getting seed data from the original pinduin table

*/
echo str_random(10);
echo rand(1,3);

$tasks_seeds = DB::select('select * from tasks_orig limit 10');
$tasks_seeds = DB::select('select status,tasks_owner,id_boards,seqnr,body,value from tasks_orig limit 10');
//echo $tasks_seeds[0]->id;
//var_dump((array) $photos[0]);
foreach ($tasks_seeds as $tasks_seed) :
//echo $tasks_seed->id.'<br>';
var_dump((array) $tasks_seed);

echo '<br>';
//echo $tasks_seed->id.'<br>';
echo '<br>';
endforeach;
//$photos = DB::table('tasks_orig')->get();
		
		$tasks = Task::all();
		
		dd($tasks_seeds, $tasks);
		
		$tasks = ['Make the Discovery Board', 'Make the Lists'];
//		return $tasks;
		return view('tasks.index')->withTasks($tasks);
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
	}

}
