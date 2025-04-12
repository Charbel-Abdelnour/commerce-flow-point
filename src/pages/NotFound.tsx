
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-pos-blue mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Page not found</p>
        <p className="text-gray-500 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/" className="pos-btn pos-btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
