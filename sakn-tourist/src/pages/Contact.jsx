import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="container">
        <div className="page-header">
          <h1>اتصل بنا</h1>
          <p>نحن هنا لمساعدتك والإجابة على جميع استفساراتك</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>معلومات التواصل</h2>
            
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h3>البريد الإلكتروني</h3>
                <p>info@sakn-tourist.dz</p>
              </div>
            </div>

            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h3>الهاتف</h3>
                <p>+213 21 00 00 00</p>
              </div>
            </div>

            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h3>العنوان</h3>
                <p>الجزائر العاصمة، الجزائر</p>
              </div>
            </div>

            <div className="office-hours">
              <h3>ساعات العمل</h3>
              <p>الأحد - الخميس: 8:00 ص - 6:00 م</p>
              <p>الجمعة - السبت: 9:00 ص - 2:00 م</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

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
                <label>الموضوع</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>الرسالة</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={18} />
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
