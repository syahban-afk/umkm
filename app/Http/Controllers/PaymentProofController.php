<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PaymentProofController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'order_id' => 'required|exists:orders,id'
        ]);

        try {
            $order = Order::findOrFail($request->order_id);

            // Upload file
            $path = $request->file('payment_proof')->store('payment-proofs', 'public');

            // Update atau buat pembayaran baru
            $payment = Payment::updateOrCreate(
                ['order_id' => $order->id],
                [
                    'payment_date' => now(),
                    'amount' => $order->total_amount,
                    'payment_method' => 'bank_transfer',
                    'status' => 'pending',
                    'proof_file' => $path
                ]
            );

            // Update status order
            $order->update(['status' => 'processing']);

            return response()->json([
                'message' => 'Bukti pembayaran berhasil diunggah',
                'payment' => $payment
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengunggah bukti pembayaran',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
