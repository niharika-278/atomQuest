import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-2">Page not found</p>
      <Link to="/dashboard" className="text-blue-600 mt-4 inline-block">
        Back to dashboard
      </Link>
    </div>
  );
}
