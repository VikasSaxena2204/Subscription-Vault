import { FaUserPlus, FaRegChartBar } from 'react-icons/fa';
import SubscriptionForm from '../components/SubscriptionForm';
import Revenue from './Revenue';

const Home = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-r from-teal-100 to-teal-200 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-8">
        Customer Subscription Management
      </h1>

      <div className="text-center text-lg text-gray-700 mb-12">
        <p>
          Welcome to our Subscription Vault Dashboard! Manage subscriptions, track revenues, and gain insightful analytics for better decision-making.
        </p>
      </div>

      <div className="p-8 shadow-lg bg-gradient-to-r from-teal-200 to-teal-100 rounded-lg hover:shadow-2xl transition duration-300 transform hover:scale-100 mb-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          <FaUserPlus className="inline-block mr-2 text-indigo-600" />
          Subscribe to a Product
        </h2>
        <p className="text-center mb-6 text-gray-700">
          Start your subscription journey today! Choose a product, provide your details, and get started.
        </p>
        <SubscriptionForm />
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-4">
          <FaRegChartBar className="inline-block mr-2 text-indigo-600" />
          Revenue Insights
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Track real-time revenue, analyze subscription performance, and make data-driven business decisions.
        </p>
      </div>

      <Revenue />
    </div>
  );
};

export default Home;
