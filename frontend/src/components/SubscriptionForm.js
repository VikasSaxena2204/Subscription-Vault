import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createSubscription, fetchCustomers, fetchProducts } from '../services/api';

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',
    start_date: '',
    end_date: '',
    no_of_users: 1,
  });

  const {
    data: customers,
    isLoading: loadingCustomers,
    isError: customerError,
  } = useQuery('customers', fetchCustomers);

  const {
    data: products,
    isLoading: loadingProducts,
    isError: productError,
  } = useQuery('products', fetchProducts);

  const mutation = useMutation(createSubscription, {
    onSuccess: () => {
      alert('Subscription created successfully!');
      setFormData({
        customer_id: '',
        product_id: '',
        start_date: '',
        end_date: '',
        no_of_users: 1,
      });
    },
    onError: (error) => {
      alert(`Error creating subscription: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customer_id || !formData.product_id) {
      alert('Please select a customer and product.');
      return;
    }

    const customer = customers.find((cust) => cust.id === formData.customer_id);
    const product = products.find((prod) => prod.id === formData.product_id);
    
    if (!customer || !product) {
      alert('Invalid customer or product selection.');
      return;
    }

    // Calculate revenue
    const revenue = product.price * formData.no_of_users;

    // Generate random subscription ID (2-digit number)
    const subscriptionId = Math.floor(10 + Math.random() * 90).toString();

    const subscriptionData = {
      ...formData,
      customer_name: customer.name,
      product_name: product.name,
      product_description: product.description,
      status: 'ongoing', // Default status
      revenue: revenue,
      id: subscriptionId,
    };

    mutation.mutate(subscriptionData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Subscription</h2>

      {customerError && <div className="text-red-500 mb-4">Failed to load customers.</div>}
      {productError && <div className="text-red-500 mb-4">Failed to load products.</div>}
      {mutation.isError && <div className="text-red-500 mb-4">{mutation.error.message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="customer_id">Customer</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300"
            required
          >
            <option value="">Select Customer</option>
            {loadingCustomers ? (
              <option>Loading...</option>
            ) : customers?.length > 0 ? (
              customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))
            ) : (
              <option>No customers found</option>
            )}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="product_id">Product</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300"
            required
          >
            <option value="">Select Product</option>
            {loadingProducts ? (
              <option>Loading...</option>
            ) : products?.length > 0 ? (
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))
            ) : (
              <option>No products found</option>
            )}
          </select>
        </div>

        <div className="mb-6 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="no_of_users">Number of Users</label>
          <input
            type="number"
            name="no_of_users"
            value={formData.no_of_users}
            onChange={handleChange}
            min="1"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          disabled={mutation.isLoading || loadingCustomers || loadingProducts}
        >
          {mutation.isLoading ? 'Adding...' : 'Create Subscription'}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
