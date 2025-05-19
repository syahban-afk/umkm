<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiscountCategory extends Model
{
    protected $fillable = ['name', 'description'];

    public function discounts(): HasMany
    {
        return $this->hasMany(Discount::class);
    }
}
