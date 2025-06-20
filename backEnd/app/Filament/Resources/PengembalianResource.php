<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use App\Models\Peminjaman;
use Filament\Tables\Table;
use App\Models\Pengembalian;
use Illuminate\Support\Carbon;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\DB;
use Filament\Tables\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\PengembalianResource\Pages;
use App\Filament\Resources\PengembalianResource\RelationManagers;

class PengembalianResource extends Resource
{
    protected static ?string $model = Peminjaman::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Pengembalian';

    protected static ?string $navigationGroup = 'Peminjaman';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                Peminjaman::query()
                    ->where('status', 'dipinjam')
                    ->with(['book', 'user', 'pengembalian'])
            )
            ->columns([
                TextColumn::make('id')
                    ->label('ID Peminjaman'),

                TextColumn::make('book.judul')
                    ->label('Buku'),

                TextColumn::make('user.name')
                    ->label('Peminjam'),

                TextColumn::make('tanggal_pinjam')
                    ->date()
                    ->label('Tanggal Pinjam'),

                TextColumn::make('tenggat')
                    ->date()
                    ->label('Tenggat Kembali')
                    ->color(fn($record) => Carbon::now()->gt($record->tenggat) ? 'danger' : 'success'),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'dipinjam' => 'warning',
                        'dikembalikan' => 'success',
                        'telat' => 'danger',
                    }),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\Action::make('kembalikan')
                    ->label('Kembalikan Buku')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->action(function (Peminjaman $peminjaman) {
                        $tanggalKembali = Carbon::now()->startOfDay();
                        $tenggat = Carbon::parse($peminjaman->tenggat)->startOfDay();

                        if ($tanggalKembali->greaterThan($tenggat)) {
                            $selisihHari = $tenggat->diffInDays($tanggalKembali);
                            $denda = $selisihHari * 5000;
                            $status = 'telat';
                        } else {
                            $denda = 0;
                            $status = 'dikembalikan';
                        }

                        // Update peminjaman
                        $peminjaman->update([
                            'status' => $status
                        ]);

                        // Simpan pengembalian
                        Pengembalian::create([
                            'tanggal_kembali' => $tanggalKembali,
                            'denda' => $denda,
                            'peminjaman_id' => $peminjaman->id
                        ]);

                        // Update stok buku
                        $peminjaman->book()->increment('stok');

                        Notification::make()
                            ->title('Pengembalian Berhasil')
                            ->body("Status: " . strtoupper($status) . 
                                  ($denda > 0 ? " (Denda: Rp " . number_format($denda, 0, ',', '.') . ")" : ''))
                            ->success()
                            ->send();
                    })
                    ->requiresConfirmation()
                    ->modalHeading('Konfirmasi Pengembalian')
                    ->modalDescription('Apakah Anda yakin ingin mencatat pengembalian buku ini?')
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPengembalians::route('/'),
            'create' => Pages\CreatePengembalian::route('/create'),
            'edit' => Pages\EditPengembalian::route('/{record}/edit'),
        ];
    }
}
