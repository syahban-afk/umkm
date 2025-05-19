import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    image_url: string;
}

interface Order {
    id: number;
    order_date: string;
    status: string;
    orderDetails: {
        id: number;
        product: Product;
        quantity: number;
        reviewed: boolean;
    }[];
}

interface Props {
    completedOrders: Order[];
}

export default function ReviewIndex({ completedOrders }: Props) {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        orderDetailId: number;
        product: Product;
    } | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleReviewClick = (orderDetailId: number, product: Product) => {
        setSelectedProduct({ orderDetailId, product });
        setShowReviewModal(true);
        setRating(5);
        setComment('');
    };

    const handleSubmitReview = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch('/api/reviews/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_detail_id: selectedProduct.orderDetailId,
                    product_id: selectedProduct.product.id,
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                setShowReviewModal(false);
                window.location.reload();
            } else {
                alert('Gagal mengirim ulasan');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim ulasan');
        }
    };

    return (
        <>
            <Head title="Beri Ulasan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6">Beri Ulasan Produk</h2>

                            {completedOrders.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Tidak ada produk yang dapat diulas</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {completedOrders.map((order) => (
                                        <div key={order.id} className="bg-gray-50 p-6 rounded-lg shadow">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold">Pesanan #{order.id}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Tanggal: {new Date(order.order_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {order.orderDetails.map((detail) => (
                                                    <div key={detail.id} className="flex items-center justify-between bg-white p-4 rounded-md">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={detail.product.image_url}
                                                                alt={detail.product.name}
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                            <div>
                                                                <h4 className="font-medium">{detail.product.name}</h4>
                                                                <p className="text-sm text-gray-600">Jumlah: {detail.quantity}</p>
                                                            </div>
                                                        </div>
                                                        {!detail.reviewed ? (
                                                            <button
                                                                onClick={() => handleReviewClick(detail.id, detail.product)}
                                                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                            >
                                                                Beri Ulasan
                                                            </button>
                                                        ) : (
                                                            <span className="text-green-600 text-sm font-medium">
                                                                Sudah Diulas
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Review */}
            {showReviewModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Beri Ulasan</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={selectedProduct.product.image_url}
                                    alt={selectedProduct.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <h4 className="font-medium">{selectedProduct.product.name}</h4>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating
                                </label>
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <svg
                                                className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Komentar
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Bagikan pengalaman Anda menggunakan produk ini"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowReviewModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSubmitReview}
                                    disabled={!comment.trim()}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Kirim Ulasan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
