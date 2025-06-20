<?php

namespace App\Providers;

use App\Models\Pengembalian;
use App\Observers\PengembalianObserver;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        \Illuminate\Auth\Events\Authenticated::class => [
            \App\Listeners\RedirectIfNotAdmin::class,
        ],
    ];
    
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
         Pengembalian::observe(PengembalianObserver::class);
    }
}
