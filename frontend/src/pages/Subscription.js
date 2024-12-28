import React, { useEffect, useState } from 'react';
import { fetchSubscriptions, extendSubscription, endSubscription } from '../services/api';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaRegChartBar, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data);
      } catch (err) {
        setError('Failed to fetch subscriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllSubscriptions();
  }, []);

  const handleExtend = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      await extendSubscription(id, { extension_count: 30 });
      setSubscriptions((prev) =>
        prev.map((sub) => 
          sub.id === id ? { ...sub, status: 'ongoing, extended' } : sub
    )
      );
      setSuccess('Subscription extended successfully!');
    } catch (err) {
      setError('Failed to extend subscription. Please try again later.');
    }
  };

  const handleEnd = async (id) => {
    setError(null);
    setSuccess(null);

    try {
      await endSubscription(id);
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, status: 'ended' } : sub
        )
      );
      setSuccess('Subscription ended successfully!');
    } catch (err) {
      const errorMessage = err.message || 'Failed to end subscription. Please try again later.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-teal-100 to-teal-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-teal-900 mb-8">Manage Subscriptions</h1>

      {error && <div className="text-center text-red-600 mb-4">{error}</div>}
      {success && <div className="text-center text-green-600 mb-4">{success}</div>}

      {loading ? (
        <p className="text-center text-gray-700">Loading subscriptions...</p>
      ) : (
        <div className="overflow-x-auto mt-8 bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto text-sm text-gray-800">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-6 py-3 font-semibold">Subs_ID</th>
                <th className="px-6 py-3 font-semibold">Customer ID</th>
                <th className="px-6 py-3 font-semibold">Product ID</th>
                <th className="px-6 py-3 font-semibold">Product Name</th>
                <th className="px-6 py-3 font-semibold">Users</th>
                <th className="px-6 py-3 font-semibold">Start Date</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-teal-50 transition duration-200">
                    <td className="border px-6 py-4">{sub.id}</td>
                    <td className="border px-6 py-4">{sub.customer_id}</td>
                    <td className="border px-6 py-4">{sub.product_id}</td>
                    <td className="border px-6 py-4">{sub.product_name}</td>
                    <td className="border px-6 py-4">{sub.no_of_users}</td>
                    <td className="border px-6 py-4">{sub.start_date}</td>
                    <td className="border px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${sub.status === 'ended' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="border px-6 py-4 flex space-x-3">
                      {sub.status !== 'expired' && (
                        <>
                          <button
                            onClick={() => handleExtend(sub.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
                          >
                            <FaEdit className="inline-block mr-2" />
                            Extend
                          </button>
                          <button
                            onClick={() => handleEnd(sub.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
                          >
                            <FaTrashAlt className="inline-block mr-2" />
                            End
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">No subscriptions available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid gap-10 grid-flow-col m-8">
        <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-teal-300 to-teal-100 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-indigo-900 mb-6">
            <FaUserPlus className="inline-block mr-2" />
            Add New Subscription
          </h2>
          <p className="text-center mb-6 text-gray-700">
            Want to add a new subscription? Click below to quickly subscribe a customer to one of your products.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 focus:outline-none transition duration-300"
          >
            Add New Subscriber
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-teal-100 to-teal-300 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-indigo-900 mb-6">
            <FaRegChartBar className="inline-block mr-2" />
            View Revenue Report
          </h2>
          <p className="text-center mb-6 text-gray-700">
            Track your revenue growth and gain insights into your subscription performance with detailed reports.
          </p>
          <Link
            to="/report"
            className="px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 focus:outline-none transition duration-300"
          >
            Revenue Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
