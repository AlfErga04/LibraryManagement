<?php

namespace App\Filament\Widgets;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;

class AStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Jumlah Kategori', Category::count())
            ->icon('heroicon-o-list-bullet'),

            Stat::make('Jumlah Buku', Book::count())
            ->icon('heroicon-o-book-open'),

            Stat::make('Jumlah Member', User::count())
            ->icon('heroicon-o-users'),
        ];
    }
}
