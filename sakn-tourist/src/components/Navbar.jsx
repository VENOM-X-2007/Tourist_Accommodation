import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">سكن سياحي</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>الرئيسية</Link>
          <Link to="/properties" className="nav-link" onClick={() => setIsOpen(false)}>العقارات</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>من نحن</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>اتصل بنا</Link>
          <Link to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>تسجيل الدخول</Link>
          <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>حساب جديد</Link>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
