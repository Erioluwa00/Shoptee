# Shoptee Brand — Demo Storefront

A front-end-only demo e-commerce site for [@shoptee.brand](https://instagram.com/shoptee.brand), built with React + Vite and plain CSS (no Tailwind, no backend).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

- **Home** — hero, Instagram-style category highlights, new arrivals, Polka Bubble feature, reviews ("love notes"), Instagram grid, newsletter
- **Shop** — category, price, search and sort filters (kept in the URL, so filtered views are shareable)
- **Product** — image gallery, colour and size pickers, size guide, delivery and policy accordions, related items
- **Bag** — slide-out drawer plus a full checkout page with delivery options and a demo order confirmation
- **Wishlist**, **Our Story**, **Contact** (with FAQ and shopping policy)

The cart and wishlist are saved in the browser's localStorage. No payment is taken.

## Content

- The logo and product photos in `public/images/` were cropped from the brand's Instagram screenshots. They should be replaced with the original high-resolution files.
- Products, prices and copy live in `src/data/products.js`. Only the Polka Bubble prices come from the brand's posts; the other prices are placeholders.
- Colours and fonts are set as CSS variables at the top of `src/index.css`.
