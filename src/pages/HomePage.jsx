import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Model3DPreview } from '../components/Model3DPreview';
import 'swiper/css';
import 'swiper/css/pagination';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const models = [
  {
    name: "The Veranda",
    desc: "A modern modular home with a covered front porch, practical layout, and strong everyday appeal. Designed to be easy to sell and easy to live in.",
    img: "/images/veranda.jpg",
    price: "From $39,900",
  },
  {
    name: "The Haven",
    desc: "A lighter, more residential version with a relaxed feel. Clean lines, simple materials, and a softer look that suits lifestyle buyers.",
    img: "/images/haven.jpg",
    price: "From $42,500",
  },
  {
    name: "The Veranda Lite",
    desc: "A more affordable take on the Veranda. Keeps the same core layout but simplifies finishes to hit a lower price point without losing usability.",
    img: "/images/veranda-lite.jpg",
    price: "From $34,900",
  },
  {
    name: "The Peak",
    desc: "A more architectural design with an angled roof and stronger visual presence. Feels more premium while still being practical to build.",
    img: "/images/peak.jpg",
    price: "From $49,900",
  },
  {
    name: "The Flatline",
    desc: "A simple, efficient box design focused on cost, speed, and scalability. Ideal for budget buyers, developers, or bulk installs.",
    img: "/images/flatline.jpg",
    price: "From $18,900",
  },
  {
    name: "The Duo",
    desc: "An extended layout that feels larger without overcomplicating the build. Better flow, more space, and suited for longer stays or dual use.",
    img: "/images/duo.jpg",
    price: "From $54,900",
  },
];

const processSteps = [
  "Choose your model",
  "Customise layout and finishes",
  "We manufacture your home",
  "Delivered to your door",
];

const testimonials = [
  {
    quote:
      "Climaforge delivered exactly what they promised, a beautiful, well built home in timely manner. The quality is outstanding.",
    name: "Sarah Thompson",
    location: "Gold Coast, QLD",
  },
  {
    quote:
      "The attention to detail and modern design exceeded our expectations. Our son loves the open layout and own privacy.",
    name: "Michael Chen",
    location: "Ocean Shores, NSW",
  },
  {
    quote:
      "From enquiry to delivery, the process was smooth and professional. Highly recommend for anyone wanting a premium modular home.",
    name: "Emma Richardson",
    location: "Sunshine Coast, QLD",
  },
  {
    quote:
      "We love the design and it feels modern without being overdone.",
    name: "Sam Green",
    location: "Logan, QLD",
  },
  {
    quote:
      "Much more realistic than a traditional build for us right now.",
    name: "Pasquale",
    location: "Gawler, SA",
  },
  {
    quote:
      "Exactly the kind of clean, practical design we have been looking for.",
    name: "Tony Sabalinko",
    location: "Two Wells, SA",
  },
];

export function HomePage() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', model: '', message: '' });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Store form data in sessionStorage for confirmation page
    sessionStorage.setItem('quoteData', JSON.stringify(formData));
    // Redirect would happen via React Router in a real app
    window.location.href = '/confirmation';
  };

  return (
    <div className="site">
      {/* HERO - More impact */}
      <motion.header
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "30px",
            left: "40px",
            color: "white",
            fontWeight: 600,
            fontSize: "20px",
            letterSpacing: "2px",
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          CLIMAFORGE
        </motion.div>

        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p 
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            CLIMAFORGE HOMES
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Modern Modular Homes That Actually Make Sense
          </motion.h1>
          <motion.p 
            className="hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Simple, modern homes designed for speed, comfort, and everyday living.
          </motion.p>
          <motion.a 
            href="#models" 
            className="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Models
          </motion.a>
        </motion.div>
      </motion.header>

      {/* INTRO */}
      <section className="section intro">
        <div className="container narrow">
          <h2>A smarter way to build</h2>
          <p>
            We focus on clean, practical modular homes that are faster to deliver, 
            easier to live in, and more realistic for today’s market.
          </p>
        </div>
      </section>

      {/* MODELS - Improved cards */}
      <motion.section 
        id="models" 
        className="section"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div 
            className="section-head"
            variants={fadeInUp}
          >
            <h2>Our Models</h2>
            <p>A focused collection of modern modular homes designed for real living.</p>
          </motion.div>

          <motion.div 
            className="model-grid"
            variants={staggerContainer}
          >
            {models.map((model, index) => (
              <motion.article 
                key={model.name} 
                className="card"
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {index === 0 && selectedModel === 'veranda' ? (
                  <Model3DPreview modelName={model.name} />
                ) : (
                  <motion.img 
                    src={model.img} 
                    alt={model.name} 
                    className="card-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="card-body">
                  <h3>{model.name}</h3>
                  <p>{model.desc}</p>
                  <p style={{ fontWeight: 600, marginTop: "12px" }}>
                    {model.price}
                  </p>
                  <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "6px" }}>
                    Final pricing varies based on configuration, delivery and site conditions.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <motion.a 
                      href="#contact" 
                      className="text-link"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Enquire about this model
                    </motion.a>
                    {index === 0 && (
                      <motion.button
                        onClick={() => setSelectedModel(selectedModel === 'veranda' ? null : 'veranda')}
                        className="text-link"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {selectedModel === 'veranda' ? 'View Photo' : '3D Preview'}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* WHY MODULAR */}
      <motion.section 
        className="section section-alt"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container narrow">
          <motion.div 
            className="section-head"
            variants={fadeInUp}
          >
            <h2>Why modular?</h2>
          </motion.div>
          <motion.ul 
            className="benefits"
            variants={staggerContainer}
          >
            <motion.li variants={fadeInUp}>Faster build times</motion.li>
            <motion.li variants={fadeInUp}>Cost-efficient compared with traditional builds</motion.li>
            <motion.li variants={fadeInUp}>Modern, practical design</motion.li>
            <motion.li variants={fadeInUp}>Customisable finishes</motion.li>
            <motion.li variants={fadeInUp}>Delivered ready to install</motion.li>
          </motion.ul>
        </div>
      </motion.section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How It Works</h2>
          </div>
          <div className="steps">
            {processSteps.map((step, index) => (
              <div key={step} className="step">
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 42, textAlign: 'center' }}>
            <h3 style={{ marginBottom: 16 }}>Watch the 20FT container build in action</h3>
            <video 
              controls 
              style={{ width: '100%', maxWidth: 960, borderRadius: 12, border: '1px solid #ccc' }}
            >
              <source src="/photo-dump/20FT container house installation video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Premium swiper */}
      <motion.section 
        className="section"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div 
            className="section-head"
            variants={fadeInUp}
          >
            <h2>What people are saying</h2>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.article 
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-body">
                    <p
                      style={{
                        fontStyle: "italic",
                        lineHeight: 1.7,
                        marginBottom: "24px",
                      }}
                    >
                      "{testimonial.quote}"
                    </p>
                    <p style={{ fontWeight: 600 }}>{testimonial.name}</p>
                    <p style={{ fontSize: "14px", opacity: 0.7 }}>
                      {testimonial.location}
                    </p>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* CONTACT */}
      <section id="contact" className="section section-alt">
        <div className="container narrow">
          <div className="section-head">
            <h2>Get a Quote</h2>
            <p>
              Tell us what you’re looking for and we’ll help you choose the right model.
            </p>
          </div>

          <form
            className="contact-form"
            action="https://formspree.io/f/REPLACE_FORM_ID"
            method="POST"
          >
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />

            <select name="model">
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              rows="6"
              placeholder="Tell us what you're looking for"
              required
            />

            <button type="submit" className="button dark">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container narrow">
          <p>
            Images shown are design concepts. Final specifications and finishes
            are confirmed prior to order.
          </p>
          <p className="footer-brand">
            © ClimaForge — Premium Modular Homes
          </p>
        </div>
      </footer>
    </div>
  );
}
