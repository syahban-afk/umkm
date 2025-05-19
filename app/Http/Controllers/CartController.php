<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Session::get('cart', []);
        $products = [];

        foreach ($cartItems as $id => $quantity) {
            $product = Product::with(['category', 'discounts' => function ($q) {
                $q->where('end_date', '>', now())
                    ->orderBy('percentage', 'desc')
                    ->limit(1);
            }])->find($id);

            if ($product) {
                $products[] = [
                    'product' => $product,
                    'quantity' => $quantity
                ];
            }
        }

        return Inertia::render('Cart/Index', [
            'cartItems' => $products
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Session::get('cart', []);
        $productId = $validated['product_id'];

        if (isset($cart[$productId])) {
            $cart[$productId] += $validated['quantity'];
        } else {
            $cart[$productId] = $validated['quantity'];
        }

        Session::put('cart', $cart);
        return response()->json(['message' => 'Produk berhasil ditambahkan ke keranjang']);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Session::get('cart', []);
        $productId = $validated['product_id'];

        if (isset($cart[$productId])) {
            $cart[$productId] = $validated['quantity'];
            Session::put('cart', $cart);
            return response()->json(['message' => 'Kuantitas produk berhasil diperbarui']);
        }

        return response()->json(['message' => 'Produk tidak ditemukan di keranjang'], 404);
    }

    public function remove(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $cart = Session::get('cart', []);
        $productId = $validated['product_id'];

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put('cart', $cart);
            return response()->json(['message' => 'Produk berhasil dihapus dari keranjang']);
        }

        return response()->json(['message' => 'Produk tidak ditemukan di keranjang'], 404);
    }

    public function checkout()
    {
        $cartItems = Session::get('cart', []);
        $products = [];

        foreach ($cartItems as $id => $quantity) {
            $product = Product::with(['category', 'discounts' => function ($q) {
                $q->where('end_date', '>', now())
                    ->orderBy('percentage', 'desc')
                    ->limit(1);
            }])->find($id);

            if ($product) {
                $products[] = [
                    'product' => $product,
                    'quantity' => $quantity
                ];
            }
        }

        if (empty($products)) {
            return redirect()->route('cart.index')
                ->with('error', 'Keranjang belanja Anda kosong');
        }

        return Inertia::render('Cart/Checkout', [
            'cartItems' => $products
        ]);
    }
}
