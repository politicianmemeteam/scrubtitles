<?php

use Illuminate\Database\Seeder;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
		$i = 0;
		
        DB::table('tasks')->insert([
			"status" 		=> 2,
			"tasks_owner"	=> 3,
			"id_boards"		=> 4,
			"seqnr"			=> $i++,
			"body"			=> "Learn 7 new sentences in Danish.",
			"value"			=> 1
        ]);
		
        DB::table('tasks')->insert([
			"status" 		=> 2,
			"tasks_owner"	=> 3,
			"id_boards"		=> 4,
			"seqnr"			=> $i++,
			"body"			=> "Make 10 Free Throws",
			"value"			=> 1
        ]);
		
		DB::table('tasks')->insert([
			"status" 		=> rand(0,2),
			"tasks_owner"	=> rand(1,3),
			"id_boards"		=> rand(1,4),
			"seqnr"			=> $i++,
			"body"			=> "Some random task like:  ".str_random(10),
			"value"			=> 1
        ]);
	
	for ($idx = 0; $idx < 5; $idx++):
		DB::table('tasks')->insert([
			"status" 		=> rand(0,2),
			"tasks_owner"	=> rand(1,3),
			"id_boards"		=> rand(5,9),
			"seqnr"			=> $i++,
			"body"			=> "Some random task like:  ".str_random(10),
			"value"			=> 1
        ]);
	endfor;
		
    }
}

