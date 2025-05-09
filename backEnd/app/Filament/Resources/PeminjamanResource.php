<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PeminjamanResource\Pages;
use App\Filament\Resources\PeminjamanResource\RelationManagers;
use App\Models\Peminjaman;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PeminjamanResource extends Resource
{
    protected static ?string $model = Peminjaman::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationLabel = 'Daftar Peminjam';

    protected static ?string $navigationGroup = 'Peminjaman';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\DatePicker::make('tanggal_pinjam')
                    ->required(),
                Forms\Components\DatePicker::make('tenggat')
                    ->required(),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\TextInput::make('user.name')
                    ->label('Nama Peminjam')
                    ->required(),
                Forms\Components\TextInput::make('book.judul')
                    ->label('Judul Buku')
                    ->required()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                ->label('Nama Peminjam')
                ->searchable()
                ->sortable(),
                Tables\Columns\TextColumn::make('tanggal_pinjam')
                ->date()
                ->sortable(),
                Tables\Columns\TextColumn::make('tenggat')
                ->date()
                ->sortable(),
                Tables\Columns\TextColumn::make('pengembalian.tanggal_kembali')
                ->label('Tanggal Pengembalian')
                ->date()
                ->sortable(),
                Tables\Columns\TextColumn::make('book.judul')
                ->label('Judul Buku')
                ->searchable()
                ->sortable(),
                Tables\Columns\TextColumn::make('status')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'dipinjam' => 'warning',
                    'dikembalikan' => 'success',
                    'telat' => 'danger',
                    
                }),
                Tables\Columns\TextColumn::make('pengembalian.denda')
                ->label('Denda')
                ->money('idr')
                ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListPeminjamen::route('/'),
            'create' => Pages\CreatePeminjaman::route('/create'),
            'edit' => Pages\EditPeminjaman::route('/{record}/edit'),
        ];
    }
}
