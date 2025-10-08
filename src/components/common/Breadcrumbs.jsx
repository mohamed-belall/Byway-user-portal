import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="absolute left-20 text-gray-600 font-semibold text-lg my-4 ">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline text-gray-700">
            Home
          </Link>
        </li>

        {paths.map((path, index) => {
          const fullPath = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-gray-400">›</span>
              {isLast ? (
                <span className="text-blue-600 font-medium">
                  {decodeURIComponent(path)}
                </span>
              ) : (
                <Link to={fullPath} className="hover:underline text-gray-700">
                  {decodeURIComponent(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
