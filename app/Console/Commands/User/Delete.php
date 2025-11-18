<?php

namespace App\Console\Commands\User;

use App\Models\User;
use Illuminate\Console\Command;

class Delete extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:delete {id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->argument('id') ?: $this->ask('Introduceți ID-ul utilizatorului de șters', User::latest()->first()->id);

        $user = \App\Models\User::find($id);

        if (!$user) {
            $this->error("User with ID {$id} not found.");
            return;
        }

        $user->delete();

        $this->info("User with ID {$id} has been deleted.");
    }
}
