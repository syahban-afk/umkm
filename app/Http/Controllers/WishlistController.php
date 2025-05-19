<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::with(['customer', 'product'])->get();
        return response()->json($wishlists);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id'
        ]);

        $wishlist = Wishlist::create($validated);
        return response()->json($wishlist, 201);
    }

    public function show(Wishlist $wishlist)
    {
        return response()->json($wishlist->load(['customer', 'product']));
    }

    public function update(Request $request, Wishlist $wishlist)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id'
        ]);

        $wishlist->update($validated);
        return response()->json($wishlist);
    }

    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
        return response()->json(null, 204);
    }
}
