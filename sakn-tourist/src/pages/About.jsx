import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      <div className="container">
        <div className="page-header">
          <h1>من نحن</h1>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>قصة سكن سياحي</h2>
            <p>
              تأسست منصة "سكن سياحي" في عام 2025 لتكون الحل الأمثل للمسافرين الباحثين عن إقامة مريحة وآمنة في الجزائر. 
              نؤمن بأن كل مسافر يستحق تجربة إقامة استثنائية، ولذلك نعمل جاهدين لتوفير أفضل الخيارات من الشقق والمنازل والفيلات المفروشة.
            </p>
          </section>

          <section className="about-section">
            <h2>رؤيتنا</h2>
            <p>
              نسعى لأن نكون المنصة الرائدة في مجال الإيجار السياحي قصير الأمد في الجزائر والعالم العربي، 
              من خلال تقديم تجربة مستخدم استثنائية وخدمات موثوقة وآمنة.
            </p>
          </section>

          <section className="about-section">
            <h2>قيمنا</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>🔒 الأمان</h3>
                <p>نضمن معاملات آمنة ومحمية لجميع المستخدمين</p>
              </div>
              <div className="value-card">
                <h3>✓ المصداقية</h3>
                <p>عقارات مؤكدة ومعلومات دقيقة وشفافة</p>
              </div>
              <div className="value-card">
                <h3>💬 خدمة العملاء</h3>
                <p>دعم متواصل لمساعدتك في كل خطوة</p>
              </div>
              <div className="value-card">
                <h3>🌟 الجودة</h3>
                <p>نختار بعناية أفضل العقارات لشركائنا</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>إحصائياتنا</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>+500</h3>
                <p>عقار متاح</p>
              </div>
              <div className="stat-card">
                <h3>+10,000</h3>
                <p>حجز ناجح</p>
              </div>
              <div className="stat-card">
                <h3>+58</h3>
                <p>مدينة مغطاة</p>
              </div>
              <div className="stat-card">
                <h3>4.8/5</h3>
                <p>متوسط التقييمات</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
