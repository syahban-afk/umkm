import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    description: string;
    stock: number;
    category?: {
        name: string;
    };
    discount?: {
        percentage: number;
    };
}

interface Props {
    wishlistItems: Product[];
}

export default function WishlistIndex({ wishlistItems }: Props) {
    const handleRemoveFromWishlist = async (productId: number) => {
        try {
            const response = await fetch(`/api/wishlist/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Gagal menghapus produk dari wishlist');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus produk dari wishlist');
        }
    };

    const handleAddToCart = async (productId: number) => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                alert('Produk berhasil ditambahkan ke keranjang');
                handleRemoveFromWishlist(productId);
            } else {
                alert('Gagal menambahkan produk ke keranjang');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menambahkan produk ke keranjang');
        }
    };

    return (
        <>
            <Head title="Wishlist" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold mb-6">Wishlist Saya</h2>

                            {wishlistItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Wishlist Anda masih kosong</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {wishlistItems.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <p className="text-gray-600 text-sm mb-1">
                                                            Kategori: {product.category?.name}
                                                        </p>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xl font-bold">
                                                                Rp {product.price.toLocaleString('id-ID')}
                                                            </span>
                                                            {product.discount && (
                                                                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                                                    {product.discount.percentage}% OFF
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {product.description.length > 100
                                                        ? `${product.description.substring(0, 100)}...`
                                                        : product.description}
                                                </p>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleAddToCart(product.id)}
                                                        disabled={product.stock === 0}
                                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                    >
                                                        {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(product.id)}
                                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
