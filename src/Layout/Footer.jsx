import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaXTwitter,
  FaMicrosoft,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-gray-300 py-12 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2">
            {/* Logo shape */}
            <div className="w-6 h-6  bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-white">Byway</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Empowering learners through accessible and engaging online
            education.
            <br />
            Byway is a leading online learning platform dedicated to providing
            high-quality, flexible, and affordable educational experiences.
          </p>
        </div>

        {/* Get Help */}
        <div>
          <h3 className="text-white font-semibold mb-4">Get Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Latest Articles
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-white font-semibold mb-4">Programs</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Art & Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Business
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                IT & Software
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Languages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Programming
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Address: 123 Main Street, Anytown, CA 12345</p>
          <p className="text-sm mt-2">Tel: +(123) 456-7890</p>
          <p className="text-sm mt-2">Mail: bywayedu@webkul.in</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-2xl">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white">
              <FaGoogle />
            </a>
            <a href="#" className="hover:text-white">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaMicrosoft />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
