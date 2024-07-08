import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '../lib/client';

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [wrongImageType, setWrongImageType] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    
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
        
        setImage({
          file: file,
          url: URL.createObjectURL(file),
          asset: document
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Upload failed:', error.message);
        setLoading(false);
        setErrorMessage('Failed to upload image. Please try again.');
      }
    } else {
      setWrongImageType(true);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !image || !image.asset || !image.asset._id) {
      setErrorMessage('Please fill in all fields and upload an image.');
      return;
    }
    
    try {
        const query = `*[_type == 'frontUser' && emailId == '${email}'] `;
        
      const userInfo = await client.fetch(query);
      
      if (userInfo.length > 0) {
        setSuccessMessage("Account already exists");
        setName('');
        setEmail('');
        setPassword('');
        setImage(null);
      } else {
        const cart=[];
        const formData = {
          _type: 'frontUser',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: image.asset._id
            }
          },
          name: name,
          emailId: email,
          password: password,
          cart:cart
        };

        const response = await client.create(formData);
        localStorage.setItem('emailId', JSON.stringify(email));
        setSuccessMessage('User created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setImage(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Sign up to your account</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <div className="flex items-center">
              {image ? (
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="mx-auto h-24 w-24 rounded-md mb-2 object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500 mr-4">No image selected</span>
              )}
              <input
                type="file"
                id="profile-image"
                name="profile-image"
                onChange={handleImageChange}
                className="ml-4"
              />
            </div>
            {wrongImageType && (
              <p className="text-red-500 text-sm mt-1">Invalid image type. Please upload PNG, JPEG, GIF, SVG, TIFF, or WEBP files.</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p className="text-sm text-gray-700 mr-2">Already have an account?</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-xs"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
