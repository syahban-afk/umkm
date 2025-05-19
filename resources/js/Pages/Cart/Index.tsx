import React from 'react';
import { Head } from '@inertiajs/react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  cartItems: CartItem[];
}

export default function Cart({ cartItems }: Props) {
  const calculateSubtotal = (item: CartItem) => {
    const price = item.product.discounts?.[0]
      ? item.product.price * (1 - item.product.discounts[0].percentage / 100)
      : item.product.price;
    return price * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + calculateSubtotal(item), 0);

  return (
    <>
      <Head title="Keranjang" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h2 className="text-2xl font-semibold mb-6">Keranjang Belanja</h2>

              {cartItems.length === 0 ? (
                <p>Keranjang belanja Anda kosong.</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-gray-600">
                              Rp {item.product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded">
                            <button
                              className="px-3 py-1 hover:bg-gray-100"
                              onClick={() => {}}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              className="px-3 py-1 hover:bg-gray-100"
                              onClick={() => {}}
                            >
                              +
                            </button>
                          </div>
                          <p className="font-medium">
                            Rp {calculateSubtotal(item).toLocaleString('id-ID')}
                          </p>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {}}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <p className="text-xl font-semibold">
                        Total: Rp {total.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                      onClick={() => {}}
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
