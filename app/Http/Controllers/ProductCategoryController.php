<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductCategories/Index', [
            'categories' => ProductCategory::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category = ProductCategory::create($validated);
        return response()->json($category, 201);
    }

    public function show(ProductCategory $productCategory)
    {
        return response()->json($productCategory);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $productCategory->update($validated);
        return response()->json($productCategory);
    }

    public function destroy(ProductCategory $productCategory)
    {
        $productCategory->delete();
        return response()->json(null, 204);
    }
}
