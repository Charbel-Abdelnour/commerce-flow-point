
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  stock: number;
  onAddToCart?: () => void;
}

const ProductCard = ({ id, name, price, image, category, stock, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-2xl text-gray-400 font-bold">{name.substring(0, 2).toUpperCase()}</div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">{category}</p>
          </div>
          <p className="font-bold text-pos-blue">${price.toFixed(2)}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-sm px-2 py-1 rounded-full ${stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
          
          {stock > 0 && onAddToCart && (
            <button 
              onClick={onAddToCart}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-pos-blue text-white hover:bg-pos-blue-dark"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
