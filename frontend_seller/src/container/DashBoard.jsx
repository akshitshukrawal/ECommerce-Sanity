import React, { useEffect, useState } from 'react';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import { orderByUser, productByUser } from '../utils/data';
import { client } from '../utils/client';

const DashBoard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [totalS, setTotalS] = useState(0);
  const [uniqueUsersCount, setUniqueUsersCount] = useState(0);
  const [noOfTransactions, setNoOfTransactions] = useState(0);
  const [noOfProducts, setNoOfProducts] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user && user._id) {
        // Fetch orders
        const ordersQuery = orderByUser(user._id);
        try {
          const ordersData = await client.fetch(ordersQuery);
          const sortedOrders = ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
          
          // Calculate total sales
          let totalSales = 0;
          sortedOrders.forEach(order => {
            totalSales += order.product.price * order.quantity;
          });
          setTotalS(totalSales);
          
          // Calculate unique users count
          const uniqueUsers = new Set();
          sortedOrders.forEach(order => {
            uniqueUsers.add(order.emailId); // Assuming userId is used to identify unique users
          });
          setUniqueUsersCount(uniqueUsers.size);
          
          // Set number of transactions (number of orders)
          setNoOfTransactions(sortedOrders.length);
          
          // Fetch number of products by the user
          const productsQuery = productByUser(user._id);
          const productsData = await client.fetch(productsQuery);
          setNoOfProducts(productsData.length);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar section (left) */}
      <div className="sm:w-1/4 bg-gray-200 p-4 space-y-4">
        <section className="widget-container">
          <WidgetItem
            percent={40} // Example percent, adjust as needed
            amount={true}
            value={totalS} // Display totalS as total revenue
            heading="Revenue"
            color="blue-500"
          />
          <WidgetItem
            percent={-14}
            value={uniqueUsersCount} // Display uniqueUsersCount as number of users
            color="cyan-500"
            heading="Users"
          />
          <WidgetItem
            percent={80}
            value={noOfTransactions} // Display noOfTransactions as number of transactions
            color="yellow-500"
            heading="Transactions"
          />
          <WidgetItem
            percent={30}
            value={noOfProducts} // Display noOfProducts as number of products
            color="indigo-500"
            heading="Products"
          />
        </section>
      </div>

      {/* Main content section (right) */}
      <div className="sm:w-3/4 p-4">
        {/* Orders section */}
        <div className="mb-4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Placed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order?.product?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order?.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      Completed
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Timeline section */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <h2 className="text-lg font-bold text-gray-800">Timeline</h2>
          {/* Placeholder content for timeline */}
        </div>
      </div>
    </div>
  );
};

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}) => (
  <article className="widget bg-white shadow-md rounded-lg p-4 mb-4">
    <div className="widget-info">
      <p className="text-sm text-gray-600">{heading}</p>
      <h4 className="text-lg">{amount ? `₹${value}` : value}</h4>
      <div className="flex items-center">
        {percent > 0 ? (
          <span className="text-green-500 flex items-center">
            <HiTrendingUp className="mr-1" /> +{percent}%
          </span>
        ) : (
          <span className="text-red-500 flex items-center">
            <HiTrendingDown className="mr-1" /> {percent}%
          </span>
        )}
      </div>
    </div>

    <div
      className={`widget-circle bg-${color} rounded-full w-20 h-20 flex items-center justify-center`}
      style={{
        background: `conic-gradient(
          ${color} ${(Math.abs(percent) / 100) * 360}deg,
          rgba(255, 255, 255, 0) 0
        )`,
      }}
    >
      <span className={`text-${color} text-lg font-bold`}>{percent}%</span>
    </div>
  </article>
);

export default DashBoard;
