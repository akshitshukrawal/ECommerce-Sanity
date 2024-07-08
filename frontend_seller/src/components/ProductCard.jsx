import React from 'react';
import { urlFor, client } from '../utils/client';
import { RiCloseCircleLine } from 'react-icons/ri'; // Importing the cross icon from react-icons

const ProductCard = ({ product, onRemove }) => {
  
  const handleRemove = async () => {
    try {
      await client.delete(product._id);
      onRemove(product._id);
    } catch (error) {
      console.error("Failed to remove the product:", error);
    }
  };
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-150 flex flex-col justify-between">
      <div>
        <a href="#">
          <img className="rounded-t-lg w-full" src={urlFor(product?.image[0])} alt="product-image" />
        </a>
        <div className="px-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.details}</p>
        </div>
      </div>
      <div className="pb-5 px-5">
        <button 
          className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleRemove}
        >
          <RiCloseCircleLine className="w-4 h-4" /> {/* Using the cross icon */}
          <span className="ml-1">Remove It from Store</span> {/* Adding some space */}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
