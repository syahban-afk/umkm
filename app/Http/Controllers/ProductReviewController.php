<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    public function index()
    {
        $reviews = ProductReview::with(['customer', 'product'])->get();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
            'review_date' => 'required|date'
        ]);

        $review = ProductReview::create($validated);
        return response()->json($review, 201);
    }

    public function show(ProductReview $productReview)
    {
        return response()->json($productReview->load(['customer', 'product']));
    }

    public function update(Request $request, ProductReview $productReview)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
            'review_date' => 'required|date'
        ]);

        $productReview->update($validated);
        return response()->json($productReview);
    }

    public function destroy(ProductReview $productReview)
    {
        $productReview->delete();
        return response()->json(null, 204);
    }
}
