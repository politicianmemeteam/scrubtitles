<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->increments('id');
            $table->char('type',20);		// the type could be the name of the app or name of the type of photo ie. bitZprofile or shoutNoutcomment 
            $table->integer('id_users')->unsigned();
            $table->integer('id_boards')->unsigned();
            $table->integer('id_tasks')->unsigned();
            $table->string('twext',140);
            $table->string('filelocation',255);	// Indicates the location of the file ie. amazon storage or /home/voicebits/voicebits.com/storage/voicebitsapps/images/user/profile/  by adding filename you get the photo
            $table->string('filename',255);
            $table->string('filemime',10);
            $table->integer('filesize')->unsigned();
			
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('photos');
    }
}
