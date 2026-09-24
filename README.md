# Sruput — Customizable Beverage Ordering App

A frontend e-commerce showcase for a fictional beverage brand, where users can browse a menu, fully customize each drink (size, sweetness level, ice level, and toppings), and see the total price update in real time before adding it to their cart.

Built as a portfolio project to practice component-based architecture, state management, and derived state calculation in React.

**Live demo:** https://sruput-order.netlify.app/

---

## Features

- Browse a menu of drinks with category tags and starting price
- Full drink customization (size, sweetness, ice level, multiple toppings) with real-time price calculation
- Cart with quantity adjustment and item removal, supporting multiple customized variants of the same drink
- Checkout form with order summary confirmation
- FAQ page with expandable accordion
- Fully responsive layout

## Tech Stack

- **React** — component-based UI
- **Vite** — build tool & dev server
- **Tailwind CSS** — styling
- **React Router** — client-side routing
- **Context API** — global cart state management
- **JavaScript (ES6+)**
- Deployed on **Vercel**

## What I Learned / Challenges

- Calculating derived state (total price) from multiple independent selections instead of storing it directly, to avoid state getting out of sync
- Using Context API to share cart state across pages without prop drilling
- Handling the string-vs-number type mismatch between React Router's `useParams()` and product IDs in the data
- Structuring reusable product data (sizes, toppings with price modifiers) to keep pricing logic simple

## Running Locally

```bash
git clone <repo-url>
cd sruput
npm install
npm run dev
```

## Project Structure

```
src/
  components/
    layout/       Navbar, Footer
    product/       ProductCard, ProductGrid
    cart/          CartItem
    shared/        Accordion
  context/
    CartContext.jsx
  data/
    products.json
  pages/
    Menu.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    OrderSummary.jsx
    FAQ.jsx
  App.jsx
  main.jsx
```

## Future Improvements

- Search/filter by category
- Form validation on checkout
- Wishlist/favorites (localStorage)
- TypeScript migration