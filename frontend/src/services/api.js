// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://subscription-vault-server.vercel.app/api';


// API requests
const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`API call failed: ${response.status}. ${errorMessage}`);
  }
  const data = await response.json();
  return data;
};

// Fetch all customers
export const fetchCustomers = async () => {
  return await apiRequest(`${API_URL}/customers`);
};

// Fetch all products
export const fetchProducts = async () => {
  return await apiRequest(`${API_URL}/products`);
};

// Fetch all subscriptions
export const fetchSubscriptions = async () => {
  return await apiRequest(`${API_URL}/subscriptions`);
};

// Create a new subscription
export const createSubscription = async (data) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create subscription');
  return response.json();
};

// Update a subscription
export const updateSubscription = async (id, data) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update subscription');
  return response.json();
};

// End a subscription
export const endSubscription = async (id, status = "ended") => {
  return await apiRequest(`${API_URL}/subscriptions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
};

// Extend a subscription
export const extendSubscription = async (id, extensionDays = 30, status = "ongoing") => {
  return await apiRequest(`${API_URL}/subscriptions/${id}/extend`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ extensionDays, status }),
  });
};
