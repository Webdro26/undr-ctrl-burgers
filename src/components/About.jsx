import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* LEFT IMAGE */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/images/about/founders.jpg"
            alt="Founders"
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="about-tag">
            OUR STORY
          </span>

          <h2 className="font-display about-title">
            WE DON'T JUST
            <br />
            MAKE BURGERS.
            <br />
            <span>WE BUILD EXPERIENCES.</span>
          </h2>

          <p>
            At <strong>UNDR CTRL</strong>, every burger starts with premium
            ingredients, handcrafted patties, freshly toasted buns and bold
            signature sauces. We don't believe in shortcuts—we believe in
            unforgettable flavour.
          </p>

          <p>
            Founded in Chennai, our mission is simple: create burgers that people
            remember long after the last bite. Every burger is built fresh,
            layered with care, and served with attitude.
          </p>

          <div className="about-quote">
            "Every burger is built to be remembered — not just eaten."
          </div>

          <div className="about-features">

            <div className="feature-card">
              <h3>100%</h3>
              <span>Fresh Ingredients</span>
            </div>

            <div className="feature-card">
              <h3>Daily</h3>
              <span>Hand Pressed</span>
            </div>

            <div className="feature-card">
              <h3>Made</h3>
              <span>In Chennai</span>
            </div>

            <div className="feature-card">
              <h3>Premium</h3>
              <span>Quality</span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}