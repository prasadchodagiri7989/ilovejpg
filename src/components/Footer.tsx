import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-400">
        
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">iLoveJPG</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link to="/security" className="hover:underline">Security</Link></li>
            <li><Link to="/tools" className="hover:underline">Tools</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Product</h4>
          <ul className="space-y-1">
            <li><Link to="/desktop" className="hover:underline">iLoveJPG Desktop</Link></li>
            <li><Link to="/mobile" className="hover:underline">iLoveJPG Mobile</Link></li>
            <li><Link to="/developers" className="hover:underline">Developers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Solutions</h4>
          <ul className="space-y-1">
            <li><Link to="/business" className="hover:underline">Business</Link></li>
            <li><Link to="/education" className="hover:underline">Education</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link to="/our-story" className="hover:underline">Our Story</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/press" className="hover:underline">Press</Link></li>
            <li><Link to="/legal" className="hover:underline">Legal & Privacy</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} iLoveJPG. Developed by <span className="font-medium text-gray-700 dark:text-gray-300">Neuvexa</span>
      </div>
    </footer>
  );
};
