<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $recentOrders = Order::where('user_id', $user->id)
            ->with(['orderItems.product'])
            ->latest()
            ->take(5)
            ->get();

        $totalOrders = Order::where('user_id', $user->id)->count();
        $pendingOrders = Order::where('user_id', $user->id)
            ->where('status', 'pending')
            ->count();
        $processingOrders = Order::where('user_id', $user->id)
            ->where('status', 'processing')
            ->count();

        return Inertia::render('Customer/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'pendingOrders' => $pendingOrders,
                'processingOrders' => $processingOrders,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
