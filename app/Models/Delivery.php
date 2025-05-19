<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    protected $fillable = ['order_id', 'delivery_date', 'courier_name', 'tracking_number', 'status'];

    protected $casts = [
        'delivery_date' => 'date'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
