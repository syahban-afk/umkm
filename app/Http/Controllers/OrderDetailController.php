<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    public function index()
    {
        $orderDetails = OrderDetail::with(['order', 'product'])->get();
        return response()->json($orderDetails);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0'
        ]);

        $orderDetail = OrderDetail::create($validated);
        return response()->json($orderDetail, 201);
    }

    public function show(OrderDetail $orderDetail)
    {
        return response()->json($orderDetail->load(['order', 'product']));
    }

    public function update(Request $request, OrderDetail $orderDetail)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0'
        ]);

        $orderDetail->update($validated);
        return response()->json($orderDetail);
    }

    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();
        return response()->json(null, 204);
    }
}
