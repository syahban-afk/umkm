import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface Order {
    id: number;
    order_date: string;
    status: string;
    total_amount: number;
    payment_status: string;
    payment_method: string;
    orderDetails: {
        product: {
            name: string;
            price: number;
        };
        quantity: number;
    }[];
}

interface Props {
    orders: Order[];
}

export default function OrderHistory({ orders }: Props) {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [paymentProof, setPaymentProof] = useState<File | null>(null);

    const filteredOrders = selectedStatus === 'all'
        ? orders
        : orders.filter(order => order.status === selectedStatus);

    const handleUploadClick = (order: Order) => {
        setSelectedOrder(order);
        setShowUploadModal(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const handleUploadSubmit = async () => {
        if (!selectedOrder || !paymentProof) return;

        const formData = new FormData();
        formData.append('payment_proof', paymentProof);
        formData.append('order_id', selectedOrder.id.toString());

        try {
            const response = await fetch('/api/payments/upload-proof', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setShowUploadModal(false);
                setPaymentProof(null);
                // Refresh halaman atau update state orders
                window.location.reload();
            } else {
                alert('Gagal mengunggah bukti pembayaran');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengunggah bukti pembayaran');
        }
    };

    return (
        <>
            <Head title="Riwayat Pesanan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6">Riwayat Pesanan</h2>

                            {/* Filter Status */}
                            <div className="mb-6">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="pending">Menunggu Pembayaran</option>
                                    <option value="processing">Diproses</option>
                                    <option value="shipped">Dikirim</option>
                                    <option value="delivered">Selesai</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                            </div>

                            {/* Daftar Pesanan */}
                            <div className="space-y-6">
                                {filteredOrders.map((order) => (
                                    <div key={order.id} className="bg-gray-50 p-6 rounded-lg shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">Pesanan #{order.id}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Tanggal: {new Date(order.order_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {order.status === 'pending' ? 'Menunggu Pembayaran' :
                                                     order.status === 'processing' ? 'Diproses' :
                                                     order.status === 'shipped' ? 'Dikirim' :
                                                     order.status === 'delivered' ? 'Selesai' :
                                                     'Dibatalkan'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Detail Produk */}
                                        <div className="space-y-4">
                                            {order.orderDetails.map((detail, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{detail.product.name}</p>
                                                        <p className="text-sm text-gray-600">{detail.quantity} x Rp {detail.product.price.toLocaleString('id-ID')}</p>
                                                    </div>
                                                    <p className="font-medium">Rp {(detail.quantity * detail.product.price).toLocaleString('id-ID')}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">Total Pembayaran</p>
                                                    <p className="text-sm text-gray-600">
                                                        Metode: {order.payment_method}
                                                    </p>
                                                </div>
                                                <p className="text-xl font-bold">Rp {order.total_amount.toLocaleString('id-ID')}</p>
                                            </div>

                                            {/* Tombol Upload Bukti Pembayaran */}
                                            {order.payment_method === 'bank_transfer' && order.payment_status === 'pending' && (
                                                <button
                                                    onClick={() => handleUploadClick(order)}
                                                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    Upload Bukti Pembayaran
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Upload Bukti Pembayaran */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Upload Bukti Pembayaran</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pilih File
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUploadSubmit}
                                    disabled={!paymentProof}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
