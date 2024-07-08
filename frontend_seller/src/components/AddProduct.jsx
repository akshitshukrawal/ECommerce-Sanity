import React, { useState } from 'react';
import { client } from '../utils/client';

const AddProduct = ({ user }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/svg' ||
        file.type === 'image/tiff' ||
        file.type === 'image/webp'
      ) {
        setWrongImageType(false);
        setLoading(true);

        try {
          const document = await client.assets.upload('image', file, {
            contentType: file.type,
            filename: file.name
          });

          setImages(prevImages => [
            ...prevImages,
            {
              _key: `${Date.now()}-${file.name}`,
              file: file,
              url: URL.createObjectURL(file),
              asset: document
            }
          ]);

          setLoading(false);
        } catch (error) {
          console.error('Upload failed:', error.message);
          setLoading(false);
          setErrorMessage('Failed to upload image. Please try again.');
        }
      } else {
        setWrongImageType(true);
      }
    }
  };
  const generateRandomSlug = () => {
    const randomString = Math.random().toString(36).substring(7);
    return `${name.toLowerCase().replace(/\s+/g, '-')}-${randomString}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || images.length === 0) {
      setErrorMessage('Please fill in all fields and upload at least one image.');
      return;
    }

    try {
      const imagesData = images.map((image) => ({
        _key: image._key,
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image.asset._id
        }
      }));

      const formData = {
        _type: 'product',
        image: imagesData,
        userId: user?._id,
        name: name,
        price: parseFloat(price),
        details: description,
        slug: {
          _type: 'slug',
          current: generateRandomSlug()
        }
      };

      const response = await client.create(formData);
      
      console.log("message",response);

      setSuccessMessage('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImages([]);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      {successMessage && <div className="bg-green-200 p-3 mb-4 rounded-md">{successMessage}</div>}
      {errorMessage && <div className="bg-red-200 p-3 mb-4 rounded-md">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
          <input type="file" id="images" name="images" onChange={handleImageChange} multiple className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          <div className="mt-2 flex space-x-2">
            {images.map((image, index) => (
              <div key={index} className="w-24 h-24 relative overflow-hidden rounded-md">
                <img src={image.url} alt={`Product Image ${index}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
        {loading && <div className="text-gray-500">Uploading...</div>}
        {wrongImageType && <div className="text-red-500">Invalid image type. Please upload PNG, JPEG, GIF, SVG, or TIFF files.</div>}
        <button type="submit" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
