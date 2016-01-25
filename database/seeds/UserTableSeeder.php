<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
		   "name"       => "Voicebits Apps Admin",
		   "username"   => "Admin",
		   "email"      => "kevin@voicebitz.com",
		   "status"     => "Y",
           'password' 	=> bcrypt('Adminsecret')
        ]);
		
		DB::table('users')->insert([
           'name' 		=> 'Pinduin Support',
		   "username"   => "Peggy P",
           "email" 		=> "peggy@pinduin.com",
		   "status"     => "Y",
           'password' 	=> bcrypt('peggyp')
        ]);
		DB::table('users')->insert([
           'name' 		=> str_random(10),
           'username' 	=> str_random(10),
           'email' 		=> str_random(10).'@gmail.com',
		   'status'		=> 'N',
           'password' 	=> bcrypt('secretsecret')
        ]);
		
    }
}

