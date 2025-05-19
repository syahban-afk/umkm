import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Product, Category, ProductFilter } from '@/types/product';
import ProductCard from '@/Components/Products/ProductCard';
import ProductFilterComponent from '@/Components/Products/ProductFilter';

export default function Index({ auth }: PageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<ProductFilter>({
        categoryId: undefined,
        discountFilter: '',
        searchQuery: '',
        minPrice: undefined,
        maxPrice: undefined,
    });

    useEffect(() => {
        // Fetch products and categories
        Promise.all([
            fetch('/api/products').then(res => res.json()),
            fetch('/api/product-categories').then(res => res.json())
        ]).then(([productsData, categoriesData]) => {
            setProducts(productsData);
            setCategories(categoriesData);
        });
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = !filter.categoryId || product.product_category_id === filter.categoryId;
        const matchesSearch = !filter.searchQuery ||
            product.name.toLowerCase().includes(filter.searchQuery.toLowerCase());
        const matchesPrice = (!filter.minPrice || product.price >= filter.minPrice) &&
            (!filter.maxPrice || product.price <= filter.maxPrice);

        let matchesDiscount = true;
        if (filter.discountFilter === 'discount') {
            matchesDiscount = product.discounts && product.discounts.length > 0;
        } else if (filter.discountFilter === 'no-discount') {
            matchesDiscount = !product.discounts || product.discounts.length === 0;
        }

        return matchesCategory && matchesSearch && matchesPrice && matchesDiscount;
    });

    const handleAddToCart = (product: Product) => {
        // TODO: Implement add to cart functionality
        console.log('Add to cart:', product);
    };

    const handleAddToWishlist = (product: Product) => {
        // TODO: Implement add to wishlist functionality
        console.log('Add to wishlist:', product);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Produk</h2>}
        >
            <Head title="Produk" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ProductFilterComponent
                        categories={categories}
                        filter={filter}
                        onFilterChange={setFilter}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
