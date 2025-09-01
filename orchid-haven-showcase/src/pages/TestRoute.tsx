import React from 'react';

const TestRoute = () => {
  console.log('TestRoute component loaded - routing is working!');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Routing Test Successful!</h1>
        <p className="text-lg text-gray-700 mb-4">
          If you can see this page, React Router is working correctly.
        </p>
        <p className="text-sm text-gray-500">
          Current URL: {window.location.href}
        </p>
        <div className="mt-6">
          <a 
            href="/" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestRoute;
