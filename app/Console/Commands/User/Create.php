<?php

namespace App\Console\Commands\User;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Create extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create
                            {name?}
                            {email?}
                            {password?}
                            {--admin : Whether the user should be created as an admin}
                            {--factory : Whether to create a user using the factory}
                            {--factory-count=1 : Number of users to create}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user with optional interactive input';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if ($this->option('factory')) {
            $count = (int)$this->option('factory-count');
            $user = User::factory()->count($count)->create();
            $this->info("Utilizatorul a fost creat cu succes: ID {$user->pluck('id')->implode(', ')}");
            return;
        }

        $name = $this->argument('name') ?: $this->ask('Introduceți numele utilizatorului');

        $emailPropose = strtolower(str_replace(' ', '.', $name)) . '@demedia.ro';
        $email = $this->argument('email') ?: $this->ask('Introduceți adresa de email',$emailPropose);

        $password = $this->argument('password') ?: $this->secret('Introduceți parola');

//        $isAdmin = $this->option('admin') ?: $this->confirm('Utilizator admin?', false);

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
//            'is_admin' => $isAdmin,
        ]);

        $this->info("Utilizatorul a fost creat cu succes: ID {$user->id}");
    }
}
