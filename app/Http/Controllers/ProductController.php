<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'discounts' => function ($q) {
            $q->where('end_date', '>', now())
                ->orderBy('percentage', 'desc')
                ->limit(1);
        }]);

        if ($request->has('category_id')) {
            $query->where('product_category_id', $request->category_id);
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('discount')) {
            if ($request->discount === 'true') {
                $query->whereHas('discounts', function ($q) {
                    $q->where('end_date', '>', now());
                });
            } else if ($request->discount === 'false') {
                $query->whereDoesntHave('discounts', function ($q) {
                    $q->where('end_date', '>', now());
                });
            }
        }

        $products = $query->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'product_category_id' => 'required|exists:product_categories,id'
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'discounts' => function ($q) {
            $q->where('end_date', '>', now())
                ->orderBy('percentage', 'desc')
                ->limit(1);
        }]);

        $reviews = $product->reviews()->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Product/Detail', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'product_category_id' => 'required|exists:product_categories,id'
        ]);

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
