<?php

namespace App\Providers;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        parent::registerPolicies($gate);

        // Defined abilities  
        # Super Admin
        $gate->define('super-admin', function ($user) {
            return $user->role === 'admin' || $user->role === 'super-admin';
        });          
        # Tasks
        $gate->define('update-task', function ($user, $task) {
            return $user->id === $task->id_users;
        });
        $gate->define('delete-task', function ($user, $task) {
            $flag = ($user->role === 'admin' || $user->id === $task->id_users) ? true : false ;
            return $flag;
        });
        $gate->define('delete-task-admin', function ($user, $task) {
            return $user->role === 'admin';
        });        
        # Boards
        $gate->define('update-board', function ($user, $board) {
            $flag = ($user->role === 'admin' || $user->id === $board->id_users) ? true : false ;
            return $flag;
        });
        $gate->define('delete-board', function ($user, $board) {
            $flag = ($user->role === 'admin' || $user->id === $board->id_users) ? true : false ;
            return $flag;
        });
        $gate->define('delete-board-admin', function ($user, $board) {
            $flag = ($user->role === 'admin') ? true : false ;
            return $flag;
        });


    }
}