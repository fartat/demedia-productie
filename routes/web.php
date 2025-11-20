<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware(['guest'])->name('login');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('phpinfo', function () {
        phpinfo();
    })->name('phpinfo');

    Route::get('/', function () {
        return Inertia::render('dashboard', [
            'componenta_laravel_version' => app()->version(),
        ]);
    })->name('dashboard');

    Route::resource('users', UserController::class)->except(['show'])
        ->names('users');


    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');

});


require __DIR__ . '/settings.php';
