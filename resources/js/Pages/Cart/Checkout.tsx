import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  cartItems: CartItem[];
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export default function Checkout({ cartItems }: Props) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    { id: 'bank_transfer', name: 'Transfer Bank', description: 'Transfer melalui bank' },
    { id: 'ewallet', name: 'E-Wallet', description: 'Pembayaran melalui e-wallet' },
    { id: 'cod', name: 'Cash on Delivery', description: 'Bayar saat barang diterima' },
  ];

  const shippingMethods: ShippingMethod[] = [
    { id: 'regular', name: 'Regular', price: 10000, estimatedDays: '3-5 hari' },
    { id: 'express', name: 'Express', price: 20000, estimatedDays: '1-2 hari' },
  ];

  const calculateSubtotal = (item: CartItem) => {
    const price = item.product.discounts?.[0]
      ? item.product.price * (1 - item.product.discounts[0].percentage / 100)
      : item.product.price;
    return price * item.quantity;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateSubtotal(item), 0);
  const shippingCost = selectedShippingMethod
    ? shippingMethods.find(method => method.id === selectedShippingMethod)?.price || 0
    : 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika checkout
  };

  return (
    <>
      <Head title="Checkout" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Alamat Pengiriman */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Alamat Pengiriman</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Penerima</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={shippingAddress.name}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Alamat</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Kota</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Kode Pos</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Metode Pengiriman */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Metode Pengiriman</h3>
                  <div className="space-y-2">
                    {shippingMethods.map((method) => (
                      <label key={method.id} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          value={method.id}
                          checked={selectedShippingMethod === method.id}
                          onChange={(e) => setSelectedShippingMethod(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {method.name} - Rp {method.price.toLocaleString('id-ID')} ({method.estimatedDays})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Metode Pembayaran</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <label key={method.id} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment_method"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ringkasan Pesanan */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya Pengiriman</span>
                      <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Buat Pesanan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
