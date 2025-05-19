import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type OrderItem = {
  id: number;
  product: { name: string };
  quantity: number;
};

type Order = {
  id: number;
  order_items: OrderItem[];
  status: string;
  created_at: string;
};

type Stats = {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
};

type DashboardProps = {
  stats: Stats;
  recentOrders: Order[];
};

const Dashboard: React.FC<DashboardProps> = ({ stats, recentOrders }) => {
  return (
    <>
      <Head title="Dashboard" />
      <AuthenticatedLayout>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Statistik Pesanan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700">Total Pesanan</h3>
                <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
              </div>
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700">Pesanan Menunggu</h3>
                <p className="text-3xl font-bold mt-2">{stats.pendingOrders}</p>
              </div>
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700">Pesanan Diproses</h3>
                <p className="text-3xl font-bold mt-2">{stats.processingOrders}</p>
              </div>
            </div>
            {/* Pesanan Terbaru */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Pesanan Terbaru Anda</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="mb-1">
                                {item.product.name} ({item.quantity}x)
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : ""
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.created_at).toLocaleDateString()}
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
