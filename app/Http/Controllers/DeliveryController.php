<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function index()
    {
        $deliveries = Delivery::with('order')->get();
        return response()->json($deliveries);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'delivery_date' => 'required|date',
            'courier_name' => 'required|string',
            'tracking_number' => 'required|string',
            'status' => 'required|string'
        ]);

        $delivery = Delivery::create($validated);
        return response()->json($delivery, 201);
    }

    public function show(Delivery $delivery)
    {
        return response()->json($delivery->load('order'));
    }

    public function update(Request $request, Delivery $delivery)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'delivery_date' => 'required|date',
            'courier_name' => 'required|string',
            'tracking_number' => 'required|string',
            'status' => 'required|string'
        ]);

        $delivery->update($validated);
        return response()->json($delivery);
    }

    public function destroy(Delivery $delivery)
    {
        $delivery->delete();
        return response()->json(null, 204);
    }
}
