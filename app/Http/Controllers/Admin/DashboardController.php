<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCustomers = User::where('role', User::ROLE_CUSTOMER)->count();
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        $totalRevenue = Order::where('status', 'completed')
            ->sum('total_amount');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalProducts' => $totalProducts,
                'totalCustomers' => $totalCustomers,
                'totalRevenue' => $totalRevenue,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
