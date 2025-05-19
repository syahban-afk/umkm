import React from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onAddToWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
    const hasDiscount = product.discounts && product.discounts.length > 0;
    const discount = hasDiscount ? product.discounts[0] : null;
    const finalPrice = hasDiscount
        ? product.price * (1 - discount!.percentage / 100)
        : product.price;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                        {discount!.percentage}% OFF
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center mt-2">
                    {hasDiscount && (
                        <span className="text-gray-500 line-through">
                            Rp {product.price.toLocaleString()}
                        </span>
                    )}
                    <span className="text-xl font-bold text-primary-600 ml-2">
                        Rp {finalPrice.toLocaleString()}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => onAddToCart?.(product)}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                    >
                        Tambah ke Keranjang
                    </button>
                    {onAddToWishlist && (
                        <button
                            onClick={() => onAddToWishlist(product)}
                            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
