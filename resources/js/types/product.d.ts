export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    product_category_id: number;
    image_url: string;
    discounts?: Discount[];
    stock?: number;
    rating?: number;
    reviews?: Review[];
}

export interface Discount {
    id: number;
    percentage: number;
    start_date: string;
    end_date: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
        name: string;
    };
}

export interface ProductFilter {
    categoryId?: number;
    discountFilter?: 'discount' | 'no-discount' | '';
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
}
