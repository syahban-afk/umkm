<?php

namespace App\Http\Controllers;

use App\Models\DiscountCategory;
use Illuminate\Http\Request;

class DiscountCategoryController extends Controller
{
    public function index()
    {
        $categories = DiscountCategory::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category = DiscountCategory::create($validated);
        return response()->json($category, 201);
    }

    public function show(DiscountCategory $discountCategory)
    {
        return response()->json($discountCategory);
    }

    public function update(Request $request, DiscountCategory $discountCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $discountCategory->update($validated);
        return response()->json($discountCategory);
    }

    public function destroy(DiscountCategory $discountCategory)
    {
        $discountCategory->delete();
        return response()->json(null, 204);
    }
}
