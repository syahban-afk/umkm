export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    description?: string;
}

export interface Discount {
    id: number;
    name: string;
    description?: string;
    percentage: number;
    start_date: string;
    end_date: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    category?: ProductCategory;
    discount?: Discount;
    created_at: string;
    updated_at: string;
}

export interface ProductReview {
    id: number;
    product_id: number;
    user_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Wishlist {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    product?: Product;
}
