import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { formatCurrency } from "@/utils";

type Order = {
    id: number;
    user: { name: string };
    total_amount: number;
    status: string;
    created_at: string;
};

type Stats = {
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    totalRevenue: number;
};

type DashboardProps = {
    stats: Stats;
    recentOrders: Order[];
};

const Dashboard: React.FC<DashboardProps> = ({ stats, recentOrders }) => {
    return (
        <>
            <Head title="Dashboard Admin" />
            <AuthenticatedLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Statistik */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Pesanan
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                    {stats.totalOrders}
                                </p>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Produk
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                    {stats.totalProducts}
                                </p>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Pelanggan
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                    {stats.totalCustomers}
                                </p>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Total Pendapatan
                                </h3>
                                <p className="text-3xl font-bold mt-2">
                                    {formatCurrency(stats.totalRevenue)}
                                </p>
                            </div>
                        </div>
                        {/* Pesanan Terbaru */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Pesanan Terbaru
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Pelanggan
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {recentOrders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        #{order.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {order.user.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(
                                                            order.total_amount
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                order.status ===
                                                                "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : order.status ===
                                                                      "processing"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : order.status ===
                                                                      "completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : order.status ===
                                                                      "cancelled"
                                                                    ? "bg-red-100 text-red-800"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(
                                                            order.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Dashboard;
