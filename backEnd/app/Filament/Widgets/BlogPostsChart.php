<?php

namespace App\Filament\Widgets;

use Carbon\Carbon;
use App\Models\Peminjaman;
use Filament\Widgets\ChartWidget;

class BlogPostsChart extends ChartWidget
{
    protected static ?string $heading = 'Chart';
    protected function getData(): array
    {
        $labels = [];
        $data = [];
    
        foreach (range(6, 0) as $i) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $labels[] = Carbon::now()->subDays($i)->format('d M');
            $data[] = Peminjaman::whereDate('created_at', $date)->count();
        }
    
        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Peminjaman',
                    'data' => $data,
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }


    protected function getType(): string
    {
        return 'line';
    }
}
