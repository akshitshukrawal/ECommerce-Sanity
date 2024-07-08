import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/client';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      // Simulating an API call for login
      const query = `*[_type == 'user' && emailId == '${email}']`;
      const users = await client.fetch(query);
      if(users.length<1){
        setSuccessMessage("No account found, Sign Up");
            setEmail('');
            setPassword('');
      }else{
        if(users[0].password === password){
            setSuccessMessage('Logged in successfully!');
            setEmail('');
            setPassword('');
            localStorage.setItem('emailId', JSON.stringify(users[0].emailId));
            navigate('/'); // Redirect to home or dashboard after login
        }else{
            setErrorMessage('Invalid password.');
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to log in. Please try again.');
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Login to your account</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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
          {/* Password */}
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
          {/* Submit button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        {/* Signup button */}
        <div className="flex items-center justify-center mt-4">
          <p className="text-sm text-gray-700 mr-2">Don't have an account?</p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-xs"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
