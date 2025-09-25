# 🛒 Homiq Shop App

A simple React + Vite application that displays a list of products
with: - 🔐 Authentication (Signup/Login with protected routes) - 🔎
Search and category filtering - 📑 Pagination (5 or 10 products per
page) - 🖼️ Product detail view (modal) - 🌆 Product images powered by
Unsplash API - 🎨 Styled with Tailwind CSS

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/LynnHourieh/Homiq-React-Assessment.git
cd homiq-frontend
```

### 2. Install dependencies

Make sure you have **Node.js v20+** installed.

``` bash
npm install
```

### 3. Environment variables

Create a `.env` file in the homiq-frontend directory :

``` bash
VITE_PRODUCTS_API=http://localhost:4000
VITE_USERS_API=http://localhost:4001
VITE_UNSPLASH_KEY=your_unsplash_api_key
```

-   `VITE_PRODUCTS_API` → json-server endpoint for products\
-   `VITE_USERS_API` → json-server endpoint for users (signup/login)\
-   `VITE_UNSPLASH_KEY` → [Unsplash API Access
    Key](https://unsplash.com/developers)

Sign up -> your apps -> New Application
### 4. Run mock APIs with json-server
First install json-server 
```bash
npm install -g json-server

```

In one terminal, start the products API (port `4000`):

``` bash
json-server --watch public/products.json --port 4000
```

In another terminal, start the users API (port `4001`):

``` bash
json-server --watch public/users.json --port 4001
```

### 5. Start the React app

``` bash
npm run dev
```

App will run at <http://localhost:5173>.

------------------------------------------------------------------------

## 🧩 Features

-   **Signup/Login** with validation (react-hook-form + Yup)
-   **Protected routes** with AuthContext and localStorage persistence
-   **Search & Filter** products by name or category
-   **Pagination** with page size selector (5 or 10 per page)
-   **Product Modal** with details view
-   **Image Loader** with spinner until Unsplash images load

------------------------------------------------------------------------

## 📂 Project Structure

    src/
     ├── api/             # API helpers
     ├── assets/          # Icons and static assets
     ├── components/      # Reusable UI components (InputField, SelectField, Modal, ProductCard)
     ├── context/         # AuthContext
     ├── models/          # TypeScript types/interfaces
     ├── pages/           # Page components (Login, Signup, Products)
     ├── App.tsx          # App routes
     └── main.tsx         # Entry point

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   ⚛️ React + Vite + TypeScript
-   🎨 Tailwind CSS
-   🗄️ json-server
-   📦 react-hook-form + Yup
-   🌆 Unsplash API

------------------------------------------------------------------------

## 📜 Scripts

``` bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

------------------------------------------------------------------------

## 🔒 Notes

-   Passwords in `users.json` should be **hashed** using `bcryptjs`.
-   Do **not** commit your `.env` file with the Unsplash key to version
    control.
-   Unsplash API Key Setup



This project uses the [Unsplash API](https://unsplash.com/developers) to fetch product images.  
To get your own API key:

1. Go to [Unsplash Developers](https://unsplash.com/developers).
2. Click **"Your Apps"** (you’ll need to sign in or create an account).
3. Click **"New Application"** and fill in the required details (name, description, etc.).
4. After creating the app, copy the **Access Key**.
5. Create a `.env` file in the root of your project and add:

   ```env
   VITE_UNSPLASH_KEY=your_access_key_here

   For Testing you can use VITE_UNSPLASH_KEY = btYtf36kzSDQ3SyTw4cTr9lF6Ltp-rf3of7Fd42Pp9U


------------------------------------------------------------------------
## 🚀 Design Improvements

### 🔹 Authentication Pages (Login & Signup)
- Updated the design to match a **modern split layout**.  
- Integrated **Swiper.js** with the `fade` effect to cycle through multiple images.  
- Applied a **consistent color palette** and hover effects for better interactivity.  
- Ensured **responsiveness** across all device sizes.  

### 🔹 Products Page & Product Detail Modal
- Followed the **Figma design suggestions** as closely as possible.  
- Added **hover animations** on product cards.  
- Improved the **product detail modal** with a cleaner layout and enlarged image.  
- Implemented **skeleton loaders** for product images while they load.  
- Made sure the design remains **responsive** on all devices.  

### 🔹 Tools & Libraries Used
- **Tailwind CSS** → Styling, responsiveness, transitions, hover effects.  
- **Swiper.js** → Image slideshow with fade effect.  
- **React Hook Form + Yup** → Form handling & validation.  
- **bcryptjs** → Password hashing for secure authentication.  
- **Unsplash API / Picsum** → Placeholder product and hero images.  
- **React Icons** → Icons for UI elements (logout, stars, etc.).  

------------------------------------------------------------------------

## 🤝 Contributing

Pull requests are welcome!

------------------------------------------------------------------------

## 📄 License

MIT License
