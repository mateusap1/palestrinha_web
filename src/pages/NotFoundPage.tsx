import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-lg mt-4">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
