import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiInstagram, FiPhone, FiMapPin, FiMail, FiArrowRight, FiSend, FiPlay } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const igPosts = [
  {
    image: '/images/instagram/post-1.jpg',
    link: 'https://www.instagram.com/p/YOUR_POST_LINK/',
    type: 'post',
    title: 'Fresh Drops',
  },
  {
    image: '/images/instagram/reel-1.jpg',
    link: 'https://www.instagram.com/reel/YOUR_REEL_LINK/',
    type: 'reel',
    title: 'Burger Build',
  },
  {
    image: '/images/instagram/post-2.jpg',
    link: 'https://www.instagram.com/p/YOUR_POST_LINK/',
    type: 'post',
    title: 'Made Different',
  },
  {
    image: '/images/instagram/reel-2.jpg',
    link: 'https://www.instagram.com/reel/DZNSga3STg9/?igsh=MWduNTVjZHUxdW0xNw==',
    type: 'reel',
    title: 'Behind The Grill',
  },
]

export function Instagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="instagram" className="instagram-section">
      <div ref={ref} className="instagram-wrap">
        <motion.div
          className="instagram-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p>ON INSTAGRAM</p>
          <h2 className="font-display">
            STAY IN <span className="chrome-text">CTRL</span>
          </h2>
          <small>Latest reels, burger drops, behind-the-scenes and flavour updates.</small>
        </motion.div>

        <div className="instagram-grid">
          {igPosts.map((post, index) => (
            <motion.a
              key={index}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="instagram-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <img src={post.image} alt={post.title} />

              {post.type === 'reel' && (
                <div className="reel-icon">
                  <FiPlay />
                </div>
              )}

              <div className="instagram-overlay">
                <FiInstagram />
                <span>{post.type === 'reel' ? 'Watch Reel' : 'View Post'}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Location() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="location" className="location-section">
      <div ref={ref} className="location-wrap">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">FIND US</p>
          <h2 className="font-display location-title">
            COME HUNGRY
LEAVE HAPPY

<br />
            <span className="chrome-text"></span>
          </h2>

          <div className="location-info">
           <div className="location-item">
   <FiMapPin />
   <span>
      23, Ground Floor, Agaram Main Road,
      Indiranagar, East Tambaram,
      Selaiyur, Chennai - 600073
   </span>
</div>
            <a href="tel:+918122996589" className="location-item">
   <FiPhone />
   <span>+91 81229 96589</span>
</a>
            <a
  href="https://wa.me/918122996589"
  target="_blank"
  rel="noreferrer"
  className="location-item"
>
  <FaWhatsapp />
  <span>WhatsApp</span>
</a>
            <a
  href="https://www.instagram.com/undrctrlburgers.in?igsh=cmk0eWwyZXp2b3ox"
  target="_blank"
  rel="noreferrer"
  className="location-item"
>
   <FiInstagram />
   <span>@undrctrlburgers.in</span>
</a>
          </div>

          <a className="location-btn" href="https://maps.app.goo.gl/5upXe8S8fUuJrGc78" target="_blank" rel="noreferrer">
            Get Directions <FiArrowRight />
          </a>
        </motion.div>

        <motion.div
          className="map-card"
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.882496623737!2d80.14396449511948!3d12.914487323195466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f74b909eaa5%3A0x4dd83fbec1345d6d!2sUNDR%20CTRL%20BURGERS!5e0!3m2!1sen!2sin!4v1782654286514!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  title="UNDR CTRL BURGERS"
/>


        </motion.div>
      </div>
    </section>
  )
}

const INPUT = {
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  padding: '1rem 1.1rem',
  borderRadius: '14px',
  fontSize: '.9rem',
  width: '100%',
  outline: 'none',
}

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrap contact-cta">
        <p>GET IN TOUCH</p>

        <h2 className="font-display">
          READY TO GET <span className="chrome-text">UNDER CTRL?</span>
        </h2>

        <h3>
          Order fresh burgers, visit us in East Tambaram, or follow our latest drops on Instagram.
        </h3>

        <div className="contact-cta-buttons">
          <a href="tel:+918122996589">Call Now</a>
          <a href="https://wa.me/918122996589" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.instagram.com/undrctrlburgers.in?igsh=cmk0eWwyZXp2b3ox" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://maps.app.goo.gl/5upXe8S8fUuJrGc78" target="_blank" rel="noreferrer">Directions</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer-premium">

      <div className="footer-container">

        {/* Left */}
        <div className="footer-brand">

          <img
            src="/images/logo/undr-ctrl-logo.jpeg"
            alt="UNDR CTRL"
            className="footer-logo"
          />

          <h2 className="font-display">
            BURGERS DONE
            <br />
            DIFFERENTLY.
          </h2>

          <p>
            Fresh ingredients. Premium smash burgers.
            Crafted daily in Chennai for people who love
            bold flavours.
          </p>

        </div>

        {/* Center */}
        <div className="footer-links">

          <h4>NAVIGATION</h4>

          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#location">Location</a>
          <a href="#instagram">Instagram</a>

        </div>

        {/* Right */}
        <div className="footer-contact">

          <h4>CONTACT</h4>

          <a href="tel:+918122996589">
            +91 81229 96589
          </a>

          <a
            href="https://wa.me/918122996589"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/undrctrlburgers.in?igsh=cmk0eWwyZXp2b3ox"
            target="_blank"
            rel="noreferrer"
          >
            @undrctrlburgers.in
          </a>

          <a
            href="https://maps.app.goo.gl/5upXe8S8fUuJrGc78"
            target="_blank"
            rel="noreferrer"
          >
            Get Directions →
          </a>

        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">

        <span>
          © 2026 UNDR CTRL BURGERS
        </span>

        <span>
          Crafted with passion.
        </span>

        <span>
          Designed & Developed by
          <a
            href="https://webdro26.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}WEBDRO
          </a>
        </span>

      </div>

    </footer>
  )
}