<?php

use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('users', function (){
    return auth()->check();
});

