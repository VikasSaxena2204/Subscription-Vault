import React, { useEffect, useState } from 'react';
import { fetchSubscriptions } from '../services/api';
import { Link } from 'react-router-dom';
import { FaRegMoneyBillAlt, FaUsers, FaCog } from 'react-icons/fa';

const Revenue = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data);
        const total = data.reduce((acc, sub) => acc + sub.revenue, 0);

        let currentRevenue = 0;
        const increment = total / 100;
        const interval = setInterval(() => {
          currentRevenue += increment;
          if (currentRevenue >= total) {
            clearInterval(interval);
            currentRevenue = total;
            setIsCalculating(false);
          }
          setTotalRevenue(currentRevenue);
        }, 50);

      } catch (err) {
        setError('Failed to fetch subscriptions. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-teal-100 to-teal-200 min-h-screen">
      <div className="text-5xl font-extrabold text-center text-indigo-900 mb-8 hover:text-indigo-950 transition duration-300">
        <Link to="/report">Revenue Dashboard</Link>
      </div>

      {error && (
        <div className="text-center text-red-600 mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mt-8 bg-white shadow-lg rounded-lg text-center">
        <table className="w-full table-auto text-sm text-gray-800">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-6 py-3 font-semibold">Customer ID</th>
              <th className="px-6 py-3 font-semibold">Product ID</th>
              <th className="px-6 py-3 font-semibold">Product</th>
              <th className="px-6 py-3 font-semibold">No. of Users</th>
              <th className="px-6 py-3 font-semibold">Product Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
              subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-teal-50 transition duration-200">
                  <td className="border px-6 py-4">{sub.customer_id}</td>
                  <td className="border px-6 py-4">{sub.product_id}</td>
                  <td className="border px-6 py-4">{sub.product_name}</td>
                  <td className="border px-6 py-4">{sub.no_of_users}</td>
                  <td className="border px-6 py-4">${sub.revenue.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No revenue data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center m-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 text-center">Total Revenue</h2>
          <div className="text-center text-4xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
            ${totalRevenue.toFixed(2)}
          </div>
          {isCalculating && (
            <div className="text-center text-lg font-medium text-gray-500 mt-2">
              <FaRegMoneyBillAlt className="inline-block mr-2" />
              Calculating...
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-teal-100 to-teal-300 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-6">
          <FaCog className="inline-block mr-3" />
          Manage Your Subscriptions
        </h2>
        <Link
          to="/subscription"
          className="px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 focus:outline-none transition duration-300"
        >
          Go to Subscriptions
        </Link>
      </div>

      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
          <FaUsers className="inline-block mr-2" />
          A Complete Overview of Your Subscription-Based Business
        </h3>
        <p className="text-lg text-gray-700">
          Monitor and manage your customer subscriptions effectively. From total revenue to individual product performance, get valuable insights into how each product is contributing to your business success.
        </p>
      </div>
    </div>
  );
};

export default Revenue;
