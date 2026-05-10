import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>🏠 سكن سياحي</h3>
            <p>منصتك الأولى لإيجار الشقق والمنازل السياحية في الجزائر</p>
            <div className="social-links">
              <a href="#">فيسبوك</a>
              <a href="#">إنستغرام</a>
              <a href="#">تويتر</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="/properties">العقارات</a></li>
              <li><a href="/about">من نحن</a></li>
              <li><a href="/contact">اتصل بنا</a></li>
              <li><a href="/faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>المساعدة</h4>
            <ul>
              <li><a href="#">شروط الاستخدام</a></li>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">الأمان والثقة</a></li>
              <li><a href="#">مركز المساعدة</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <ul>
              <li>📧 info@sakn-tourist.dz</li>
              <li>📞 +213 21 00 00 00</li>
              <li>📍 الجزائر العاصمة، الجزائر</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 سكن سياحي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
