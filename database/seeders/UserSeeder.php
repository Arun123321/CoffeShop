<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	  DB::table('users')->truncate();
          DB::table('users')->insert([
               'name' => 'Admin',
               'email' =>'arunpajith123@gmail.com',
               'password' => Hash::make('1234'),
               'is_admin'=>1
             ]);
    }
}
