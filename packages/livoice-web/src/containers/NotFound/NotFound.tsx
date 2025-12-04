import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-slate-100 px-4 text-center">
    <p className="text-sm font-semibold text-slate-500">404</p>
    <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
    <p className="text-sm text-slate-500">The page you are looking for does not exist.</p>
    <Link to="/" className="text-sm font-semibold text-sky-600 hover:underline">
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
