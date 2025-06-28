import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
       
        <div className="flex items-center">
          <img src={logo} alt="BudgetMate Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">
            <strong>BudgetMate</strong>
          </h1>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        
        <div className={`flex-col md:flex md:flex-row gap-4 ${isOpen ? "flex" : "hidden"} md:items-center`}>
          <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/register" className="text-gray-700 hover:text-amber-600 transition-colors">Register</Link>
          <Link to="/login" className="text-gray-700 hover:text-amber-600 transition-colors">Login</Link>
          <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//Grish Pradhan