import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const menuData = {
  'Beef Burgers': [
    { name:'OG Smash Burger', price:300, desc:'Brioche toasted buns, double smashed beef patties, melted cheese and in-house sauce.', tag:'SIGNATURE', img:'/images/menu/beef-og-smash.jpg' },
    { name:'Oklahoma Onion Smash', price:330, desc:'Paper-thin onions smashed into juicy beef patties, melted cheese and house sauce.', tag:null, img:'/images/menu/beef2.jpg' },
    { name:'Swiss Cheese Burger', price:400, desc:'Juicy thick smashed patty, Swiss cheese and caramelised oyster mushrooms.', tag:'MUST TRY', img:'/images/menu/beef3.jpg' },
  ],
  'Chicken Burgers': [
    { name:'Red Dragon', price:290, desc:'Crispy chicken tossed in Nashville hot spice, pickle and in-house sauce on brioche.', tag:'SPICY', img:'/images/menu/ch2.jpg' },
    { name:'Pineapple Candy', price:290, desc:'Crispy chicken glazed in signature candy sauce with caramelised pineapple.', tag:'MUST TRY', img:'/images/menu/ch1.jpg' },
    { name:'Bhut Jolokia Slaw', price:290, desc:'Fiery Bhut Jolokia pepper balanced with coleslaw and a secret chef touch.', tag:'HOT', img:'/images/menu/ch3.jpg' },
  ],
  'Vegetarian': [
    { name:'Fried Shrooms Burger', price:260, desc:'Golden fried mushroom, fresh veggies, melted cheese and in-house sauce.', tag:'VEG', img:'/images/menu/veg1.jpg'},
  ],
  'Loaded Fries': [
    { name:'King Loaded Fries', price:280, desc:'Crispy golden fries loaded with fried chicken, creamy sauce and signature toppings.', tag:null, img:'/images/menu/lf1.jpg' },
    { name:'Prawn Loaded Fries', price:320, desc:'Crispy golden fries loaded with juicy fried prawn and creamy signature sauce.', tag:'PREMIUM', img:'/images/menu/lf2.jpg' },
  ],
  'Pasta': [
    { name:"Chicken Mac 'n' Cheese", price:330, desc:'Creamy macaroni smothered in rich cheese sauce and loaded with juicy chicken.', tag:null, img:'/images/menu/pa1.jpg' },
    { name:"Prawn Mac 'n' Cheese", price:380, desc:'Creamy macaroni smothered in rich cheese sauce and loaded with juicy prawns.', tag:'PREMIUM', img:'/images/menu/pa2.jpg' },
  ],
  'Sides': [
    { name:'Fly High Wings', price:200, desc:'Crispy golden fried chicken wings glazed with signature spicy sauce and seasoning.', tag:'HOT', img:'/images/menu/s1.jpg' },
  ],
  'Refreshers': [
    { name:'Lemon Mint Mojito', price:120, desc:'Zesty green apple, fresh mint and a refreshing citrus finish.', tag:null, img:'/images/menu/rf1.jpg' },
    { name:'Blue Curacao Mojito', price:120, desc:'Vibrant blue mojito with refreshing citrus notes and cool mint.', tag:null, img:'/images/menu/rf2.jpg' },
  ],
  'Shakes': [
    { name:'Choco Brownie Shake', price:180, desc:'Decadent brownie thick shake loaded with chocolatey goodness in every sip.', tag:null, img:'/images/menu/sh1.jpg' },
    { name:'Salted Caramel Shake', price:180, desc:'Rich creamy shake with the perfect balance of sweet caramel and sea salt.', tag:null, img:'/images/menu/sh2.jpg' },
  ],
}

const categories = Object.keys(menuData)

function MenuCard({ item, index }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ delay: index * .07, duration: .55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="menu-card"
    >
      <div className="cheese-drip"><span /><span /><span /></div>
      <div className="menu-img-wrap">
        <img src={item.img} alt={item.name} />
        <div className="menu-img-shine" />
        {item.tag && <span className="menu-tag">{item.tag}</span>}
        <motion.div className="menu-plus" animate={{ scale: hover ? 1 : .86, opacity: hover ? 1 : .55 }}>
          ₹{item.price}
        </motion.div>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-top">
          <h3>{item.name}</h3>
          <strong>₹{item.price}</strong>
        </div>
        <p>{item.desc}</p>
        <motion.div className="menu-line" animate={{ scaleX: hover ? 1 : .18 }} />
      </div>
    </motion.article>
  )
}

export default function Menu() {
  const [active, setActive] = useState(categories[0])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const items = menuData[active]

  return (
    <section id="menu" className="menu-section">
      <div className="menu-shell">
        <motion.div ref={ref} className="menu-head" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .65 }}>
          <p><span />The menu</p>
          <h2 className="font-display">NOT A MENU.<br /><span className="chrome-text">A CONTROL PANEL.</span></h2>
    
        </motion.div>

        <motion.div className="menu-tabs" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: .18, duration: .55 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={active === cat ? 'active' : ''}>
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active} className="menu-grid" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .35 }}>
            {items.map((item, index) => <MenuCard key={item.name} item={item} index={index} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
