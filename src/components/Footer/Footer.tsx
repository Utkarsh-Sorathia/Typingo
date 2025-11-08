import { Link } from 'react-router-dom'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart } from 'react-icons/fa'

export default function Main() {
  return (
    <div className="font-['Poppins',sans-serif] bg-white overflow-x-hidden">
      <footer className="bg-gray-900 text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-3">
                <FontAwesomeIcon
                  icon={faKeyboard}
                  className="text-indigo-400 text-2xl mr-2"
                />
                <span className="text-xl font-bold">Typingo</span>
              </div>
              <p className="text-gray-400 mb-2 max-w-md text-sm">
                The ultimate platform to test and improve your typing skills.
                Fast, fun, and free!
              </p>
            </div>

            {/* Quick Links */}
            <div className="mr-4 sm:mr-6">
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tests"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Typing Tests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/time-base"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Time Based
                  </Link>
                </li>
                <li>
                  <Link
                    to="/keyboard-mastery"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Keyboard Mastery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal & Support</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Typingo. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2 md:mt-0">
                Made with <FaHeart className="inline text-rose-500" /> by Typingo
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
