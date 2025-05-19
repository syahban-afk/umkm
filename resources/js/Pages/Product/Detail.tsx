import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Product, ProductReview } from "@/types";

interface Props {
    product: Product;
    reviews: ProductReview[];
}

export default function ProductDetail({ product, reviews }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            : 0;

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        console.log("Adding to cart:", { productId: product.id, quantity });
    };

    const handleToggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // TODO: Implement wishlist functionality
        console.log("Toggle wishlist for product:", product.id);
    };

    return (
        <>
            <Head title={`${product.name} - Detail Produk`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Gallery */}
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                            <p className="text-sm text-gray-500 mt-2">
                                Kategori: {product.category?.name}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`w-5 h-5 ${
                                            star <= averageRating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    ({reviews.length} ulasan)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </span>
                                {product.discount && (
                                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                        Diskon {product.discount.percentage}%
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                Stok: {product.stock} tersedia
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-gray-700">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <label
                                    htmlFor="quantity"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Jumlah:
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(parseInt(e.target.value))
                                    }
                                    className="shadow-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {product.stock === 0
                                        ? "Stok Habis"
                                        : "Tambah ke Keranjang"}
                                </button>
                                <button
                                    onClick={handleToggleWishlist}
                                    className={`p-3 rounded-md border ${
                                        isWishlisted
                                            ? "bg-red-50 border-red-200 text-red-600"
                                            : "border-gray-300 text-gray-700"
                                    } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill={
                                            isWishlisted
                                                ? "currentColor"
                                                : "none"
                                        }
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Ulasan Produk
                    </h2>
                    <div className="space-y-8">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white rounded-lg shadow p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        className={`w-5 h-5 ${
                                                            star <=
                                                            review.rating
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString("id-ID")}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">
                                Belum ada ulasan untuk produk ini.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
