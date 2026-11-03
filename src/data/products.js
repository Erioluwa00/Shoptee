const img = (name) => `/images/${name}.jpg`

export const INSTAGRAM_URL = 'https://instagram.com/shoptee.brand'
export const BACKUP_INSTAGRAM_URL = 'https://instagram.com/shoptee.brand2'

const CLOTHING_SIZES = ['S', 'M', 'L', 'XL']

export const categories = [
  { id: 'all', name: 'All', image: img('polka-red-model') },
  { id: 'tops', name: 'Tops', image: img('eyelet-tops') },
  { id: 'sets', name: 'Sets', image: img('polka-light-promo') },
  { id: 'bottoms', name: 'Skirts & Bottoms', image: img('camo-skirt') },
  { id: 'jumpsuits', name: 'Dresses & Jumpsuits', image: img('eyelet-jumpsuit') },
  { id: 'accessories', name: 'Accessories', image: img('watches') },
]

export const products = [
  {
    id: 'polka-bubble-set',
    name: 'Polka Dot Bubble 2-Piece',
    category: 'sets',
    price: 10500,
    compareAt: 12500,
    badge: 'Bestseller',
    images: [img('polka-light-promo'), img('polka-red-model'), img('polka-dark-promo')],
    colors: [
      { name: 'Light polka', hex: '#f4f1ec' },
      { name: 'Dark polka', hex: '#1f1b1c' },
      { name: 'Red polka', hex: '#7b1e2e' },
    ],
    sizes: CLOTHING_SIZES,
    description:
      'Stylish, versatile and bubble perfect. A halter-neck smocked top with a puffy bubble mini skirt. Wear them together or style separately — the top pairs with pants, skirts or shorts.',
    note: 'Top only ₦5,500 · Skirt only ₦7,000 · Save ₦2k on the set',
  },
  {
    id: 'eyelet-halter-top',
    name: 'Eyelet Halter Top',
    category: 'tops',
    price: 6500,
    badge: 'New in',
    images: [img('eyelet-tops'), img('eyelet-flatlay'), img('eyelet-black-model'), img('eyelet-yellow-model')],
    colors: [
      { name: 'White', hex: '#f7f5f2' },
      { name: 'Chocolate', hex: '#5a3a2a' },
      { name: 'Butter', hex: '#f3e7a1' },
      { name: 'Black', hex: '#1d1b1b' },
    ],
    sizes: CLOTHING_SIZES,
    description:
      'Our cult-favourite stretchy halter with silver eyelet detailing. Soft, snatched and made to show off those shoulders.',
  },
  {
    id: 'eyelet-halter-jumpsuit',
    name: 'Eyelet Halter Jumpsuit',
    category: 'jumpsuits',
    price: 16500,
    badge: 'New in',
    images: [img('eyelet-jumpsuit')],
    colors: [{ name: 'Black', hex: '#1d1b1b' }],
    sizes: CLOTHING_SIZES,
    description:
      'A sleek one-piece with an eyelet scoop halter neckline and a figure-hugging fit. Throw on gold jewelry and go.',
  },
  {
    id: 'brasil-halter-top',
    name: 'Brasil Halter Top',
    category: 'tops',
    price: 8000,
    badge: 'Limited',
    images: [img('brazil-flatlay'), img('brazil-street')],
    colors: [{ name: 'Yellow', hex: '#f2d43c' }],
    sizes: CLOTHING_SIZES,
    description:
      'The summer it-top. Choose style A (tie halter) or B (crochet halter) — both pair perfectly with baggy jorts.',
  },
  {
    id: 'baggy-denim-jorts',
    name: 'Baggy Denim Jorts',
    category: 'bottoms',
    price: 9500,
    images: [img('brazil-street'), img('brazil-flatlay')],
    colors: [{ name: 'Light wash', hex: '#a9b8c4' }],
    sizes: CLOTHING_SIZES,
    description: 'Low-rise, knee-length and effortlessly cool. Raw hem with a tinted vintage wash.',
  },
  {
    id: 'vintage-gold-watch',
    name: 'Vintage Gold Watch',
    category: 'accessories',
    price: 14000,
    images: [img('watches')],
    colors: [{ name: 'Gold', hex: '#c9a36a' }],
    sizes: null,
    description:
      'Dainty vintage-inspired gold watches in three faces — oval, slim rectangle and square. The finishing touch to every look.',
  },
  {
    id: 'camo-mini-skirt',
    name: 'Camo Mini Skirt',
    category: 'bottoms',
    price: 9000,
    images: [img('camo-skirt')],
    colors: [{ name: 'Camo', hex: '#6b6146' }],
    sizes: CLOTHING_SIZES,
    description: 'A stretch-denim camo mini that hugs in all the right places. Style with a fitted baby tee.',
  },
  {
    id: 'classic-baby-tee',
    name: 'Classic Baby Tee',
    category: 'tops',
    price: 5000,
    images: [img('white-tee')],
    colors: [
      { name: 'White', hex: '#f7f5f2' },
      { name: 'Black', hex: '#1d1b1b' },
    ],
    sizes: CLOTHING_SIZES,
    description: 'The everyday essential. A fitted, cropped tee in a soft ribbed cotton.',
  },
  {
    id: 'los-angeles-graphic-tank',
    name: 'Los Angeles Graphic Tank',
    category: 'tops',
    price: 6000,
    images: [img('la-tank')],
    colors: [{ name: 'Butter', hex: '#f3e7a1' }],
    sizes: CLOTHING_SIZES,
    description: 'A cropped ribbed tank with a vintage-style graphic print and contrast trims.',
  },
  {
    id: 'open-back-top',
    name: 'Open Back Bodycon Top',
    category: 'tops',
    price: 7500,
    images: [img('open-back')],
    colors: [{ name: 'Black', hex: '#1d1b1b' }],
    sizes: CLOTHING_SIZES,
    description: 'Simple from the front, a statement from the back. Our bestselling bodycon fabric.',
  },
  {
    id: 'contrast-trim-tank',
    name: 'Contrast Trim Tank',
    category: 'tops',
    price: 5500,
    badge: 'Restocked',
    images: [img('trim-tank-red'), img('trim-tank-brown')],
    colors: [
      { name: 'Rust', hex: '#a24c3c' },
      { name: 'Chocolate', hex: '#5a3a2a' },
    ],
    sizes: CLOTHING_SIZES,
    description: 'Scoop-neck script tank with baby-blue contrast binding. Perfect with denim minis.',
  },
  {
    id: 'star-baby-tee',
    name: 'Star Rhinestone Tee',
    category: 'tops',
    price: 6500,
    images: [img('star-tee')],
    colors: [{ name: 'Cream', hex: '#efe6da' }],
    sizes: CLOTHING_SIZES,
    description: 'A sparkly rhinestone star baby tee. Pair with a sequin skirt for a night out.',
  },
]

export const getProduct = (id) => products.find((p) => p.id === id)

export const formatPrice = (n) => `₦${n.toLocaleString('en-NG')}`
