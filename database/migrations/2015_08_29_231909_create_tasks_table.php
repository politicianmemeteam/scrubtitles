<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tasks', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('status', 4)->default('0');			
            $table->integer('tasks_owner')->unsigned();
            $table->integer('id_boards')->unsigned();
            $table->integer('seqnr')->unsigned();
            $table->string('body', 3000);			
            $table->smallInteger('value');
            $table->integer('id_orig')->unsigned();
			$table->timestamps();

			$table->unique(['id_boards', 'seqnr']);
		});


	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tasks');
	}

}
