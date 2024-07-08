import React, { useEffect, useState } from 'react';
import { productByUser } from '../utils/data';
import { client } from '../utils/client'; // Importing icons from react-icons
import ProductCard from '../components/ProductCard';

const Products = ({ user }) => {
  const [products, setProducts] = useState();// State to manage panel open/close

  useEffect(() => {
    const query = productByUser(user?._id);
    client.fetch(query).then((data) => {
      setProducts(data);
    });
  }, [user]);

  
  const handleRemove = (productId) => {
    setProducts(products.filter(product => product._id !== productId));
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product && product} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
