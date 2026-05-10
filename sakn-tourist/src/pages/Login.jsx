import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم تسجيل الدخول بنجاح!');
    navigate('/');
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <LogIn size={48} />
              <h1>تسجيل الدخول</h1>
              <p>مرحباً بعودتك! يرجى إدخال بياناتك</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>كلمة المرور</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>تذكرني</span>
                </label>
                <a href="#" className="forgot-password">نسيت كلمة المرور؟</a>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                تسجيل الدخول
              </button>

              <div className="auth-divider">
                <span>أو</span>
              </div>

              <button type="button" className="btn btn-outline btn-block">
                تسجيل الدخول عبر فيسبوك
              </button>

              <p className="auth-footer">
                ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
