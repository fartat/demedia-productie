<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class EventCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'event {--delete}';

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
        if($this->option('delete')){
            User::query()->latest()->first()->delete();
            return;
        }
        $user = User::factory()->create();
    }
}
