import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Font Awesome Plus Icon
import logo from "../images/logo.jpeg" // Replace with actual path to image

function Header() {
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
            {/* Left side - Logo */}
            <div className="text-xl font-semibold text-indigo-600">
                SIP Calculator
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-4">
                {/* WhichTech icon with text */}
                <div className="flex items-center space-x-2">
                    <FaPlus className="text-indigo-500" />
                    <span className="text-gray-700 font-medium">WhichTech</span>
                </div>

                {/* Investing image */}
                <img
                    src={logo}
                    alt="Investing"
                    className="w-8 h-8 rounded-full object-cover" // Adjust size as needed
                />
            </div>
        </header>
    );
}

export default Header;
