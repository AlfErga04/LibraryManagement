<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Denda;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\Pengembalian;
use Filament\Resources\Resource;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\DendaResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\DendaResource\RelationManagers;

class DendaResource extends Resource
{
    protected static ?string $model = Pengembalian::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Peminjaman';
    protected static ?string $navigationLabel = 'Denda';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('jumlah_denda')
                    ->numeric()
                    ->required(),
                Forms\Components\DateTimePicker::make('waktu_bayar')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                Pengembalian::query()
                    ->where('denda', '>', 0) // Hanya yang memiliki denda
                    ->whereDoesntHave('pembayaran') // Hanya yang belum memiliki pembayaran
                    ->with(['peminjaman.user', 'peminjaman.book'])
            )
            ->columns([
                Tables\Columns\TextColumn::make('peminjaman.user.name')
                    ->label('Peminjam')
                    ->searchable(),

                Tables\Columns\TextColumn::make('peminjaman.book.judul')
                    ->label('Buku'),

                Tables\Columns\TextColumn::make('tanggal_kembali')
                    ->date()
                    ->label('Tanggal Kembali'),

                Tables\Columns\TextColumn::make('denda')
                    ->label('Jumlah Denda')
                    ->money('IDR')
                    ->color('danger'),

                Tables\Columns\TextColumn::make('status_pembayaran')
                    ->label('Status')
                    ->state(function ($record) {
                        return $record->pembayaran ? 'Lunas' : 'Belum Dibayar';
                    })
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Lunas' => 'success',
                        'Belum Dibayar' => 'danger',
                    }),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\Action::make('bayar_denda')
                    ->form([
                        Forms\Components\TextInput::make('jumlah_denda')
                            ->label('Jumlah Dibayar')
                            ->numeric()
                            ->default(fn($record) => $record->denda)
                            ->required()
                            ->minValue(fn($record) => $record->denda)
                            ->disabled(fn($record) => $record->pembayaran !== null),

                        Forms\Components\DateTimePicker::make('waktu_bayar')
                            ->label('Waktu Pembayaran')
                            ->default(now())
                            ->required(),
                    ])
                    ->action(function (Pengembalian $record, array $data) {
                        // Catat pembayaran tunai
                        $record->pembayaran()->create([
                            'jumlah_denda' => $data['jumlah_denda'],
                            'waktu_bayar' => $data['waktu_bayar'],
                        ]);

                        Notification::make()
                            ->title('Pembayaran tunai berhasil dicatat')
                            ->success()
                            ->send();
                    })
                    ->hidden(fn($record) => $record->pembayaran !== null) // Sembunyikan jika sudah dibayar
                    ->requiresConfirmation()
                    ->modalHeading('Konfirmasi Pembayaran Tunai')
                    ->modalDescription('Apakah Anda yakin ingin mencatat pembayaran tunai ini?')
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
            'index' => Pages\ListDendas::route('/'),
            'create' => Pages\CreateDenda::route('/create'),
            'edit' => Pages\EditDenda::route('/{record}/edit'),
        ];
    }
}
