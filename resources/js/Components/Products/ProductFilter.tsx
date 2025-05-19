import React from 'react';
import { Category, ProductFilter } from '@/types/product';

interface ProductFilterProps {
    categories: Category[];
    filter: ProductFilter;
    onFilterChange: (filter: ProductFilter) => void;
}

export default function ProductFilter({ categories, filter, onFilterChange }: ProductFilterProps) {
    const handleFilterChange = (key: keyof ProductFilter, value: any) => {
        onFilterChange({
            ...filter,
            [key]: value,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Filter Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Kategori Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori
                    </label>
                    <select
                        value={filter.categoryId || ''}
                        onChange={(e) => handleFilterChange('categoryId', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter Diskon */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diskon
                    </label>
                    <select
                        value={filter.discountFilter || ''}
                        onChange={(e) => handleFilterChange('discountFilter', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Semua Produk</option>
                        <option value="discount">Produk Diskon</option>
                        <option value="no-discount">Tanpa Diskon</option>
                    </select>
                </div>

                {/* Filter Nama Produk */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Produk
                    </label>
                    <input
                        type="text"
                        value={filter.searchQuery || ''}
                        onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                        placeholder="Cari produk..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Filter Harga */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rentang Harga
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={filter.minPrice || ''}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="Min"
                            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="number"
                            value={filter.maxPrice || ''}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="Max"
                            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
