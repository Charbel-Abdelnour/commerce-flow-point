
import React, { useState } from 'react';
import { Search, Trash2, ChevronLeft, ChevronRight, ShoppingBag, CreditCard } from 'lucide-react';
import ProductCard from '../common/ProductCard';

// Sample product data
const productCategories = ['All', 'Electronics', 'Clothing', 'Food & Beverages', 'Accessories'];

const sampleProducts = [
  { id: '1', name: 'Bluetooth Headphones', price: 59.99, category: 'Electronics', stock: 15 },
  { id: '2', name: 'USB-C Charger Cable', price: 12.99, category: 'Electronics', stock: 23 },
  { id: '3', name: 'Wireless Mouse', price: 24.95, category: 'Electronics', stock: 7 },
  { id: '4', name: 'T-Shirt (Black)', price: 19.99, category: 'Clothing', stock: 42 },
  { id: '5', name: 'Baseball Cap', price: 14.99, category: 'Clothing', stock: 19 },
  { id: '6', name: 'Coffee Mug', price: 8.99, category: 'Accessories', stock: 31 },
  { id: '7', name: 'Protein Bar', price: 2.49, category: 'Food & Beverages', stock: 54 },
  { id: '8', name: 'Energy Drink', price: 3.49, category: 'Food & Beverages', stock: 62 },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const POSInterface = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const filteredProducts = sampleProducts.filter(product => 
    (activeCategory === 'All' || product.category === activeCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Products Section */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="search"
              placeholder="Search products..."
              className="pos-input pl-10 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-hide">
            {productCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-pos-blue text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p>No products found.</p>
              <p className="text-sm">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Cart Section */}
      <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-xl">Current Sale</h2>
          <p className="text-sm text-gray-500">Add items to the cart</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <p className="text-sm">Add items to start a sale</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="pos-btn pos-btn-secondary">
              Cancel
            </button>
            <button 
              className="pos-btn pos-btn-primary flex items-center justify-center gap-2"
              disabled={cart.length === 0}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <CreditCard size={18} />
              <span>Pay</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Payment Modal - Just a placeholder for this demo */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <p className="mb-6">This would show payment options in a real application.</p>
            <div className="flex justify-end gap-3">
              <button 
                className="pos-btn pos-btn-secondary"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="pos-btn pos-btn-primary"
                onClick={() => {
                  setCart([]);
                  setIsPaymentModalOpen(false);
                  alert('Payment successful! Receipt printed.');
                }}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSInterface;
