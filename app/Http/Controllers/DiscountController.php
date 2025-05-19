<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::with(['category', 'product'])->get();
        return response()->json($discounts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'discount_category_id' => 'required|exists:discount_categories,id',
            'product_id' => 'required|exists:products,id',
            'percentage' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $discount = Discount::create($validated);
        return response()->json($discount, 201);
    }

    public function show(Discount $discount)
    {
        return response()->json($discount->load(['category', 'product']));
    }

    public function update(Request $request, Discount $discount)
    {
        $validated = $request->validate([
            'discount_category_id' => 'required|exists:discount_categories,id',
            'product_id' => 'required|exists:products,id',
            'percentage' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $discount->update($validated);
        return response()->json($discount);
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();
        return response()->json(null, 204);
    }
}
