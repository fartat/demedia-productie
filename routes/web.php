<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard',[
            'componenta_laravel_version' => app()->version(),
        ]);
    })->name('dashboard');

    Route::resource('users', UserController::class)->except(['show']);

});





require __DIR__.'/settings.php';
