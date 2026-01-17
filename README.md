# ✨ Custom Spark

Custom Spark is a modern, high-performance e-commerce platform built with **Next.js 15**. It offers a premium shopping experience with a focus on speed, aesthetics, and user-centric features.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.x-764ABC?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)

---

## 🚀 Key Features

- **Premium UI/UX**: Stunning landing page with 8 unique sections, glassmorphic effects, and fluid animations.
- **Robust Authentication**: Secure login via **Google OAuth** and **Credentials** (Email/Password).
- **Dynamic Catalog**: Full-featured product listing with real-time search, category filtering, and sorting.
- **Detailed Views**: Dynamic product pages with interactive galleries, tabbed specifications, and related treasures.
- **Protected Management**: Secure "Add Product" flow with multi-step validation and SKU auto-generation.
- **User Experience**: Toast notifications, interactive skeletons, and 100% mobile responsiveness.
- **SEO Optimized**: Dynamic metadata, OpenGraph tags, and JSON-LD structured data for every product.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS (v4)
- **Validation**: Zod + React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Security**: BCrypt.js for password hashing

---

- **Database Integration**: Powered by **Prisma ORM** and **PostgreSQL**.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **PostgreSQL**: v14.0 or higher
- **npm / yarn / pnpm**: Latest version recommended

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/nokib-web/CustomSpark.git
    cd customspark
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add:
    ```env
    # Database
    DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db?schema=public"

    # NextAuth
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your_secret_here"
    ```

4.  **Database Setup**
    ```bash
    # Generate Prisma Client
    npx prisma generate

    # Run Migrations
    npx prisma migrate dev

    # Seed initial data
    npx prisma db seed
    ```

5.  **Run Locally**
    ```bash
    npm run dev
    ```

### 📚 Deployment
This project is optimized for deployment on **Vercel**. 

1. **Connect your repository** to Vercel.
2. **Environment Variables**: Add all variables from `.env.local` to Vercel.
3. **Build Command**: Vercel will automatically detect settings, but if needed: `prisma generate && next build`.
4. **Database**: Use a managed PostgreSQL provider (e.g., Supabase, Neon) and provide the `DATABASE_URL`.

## 🏗 Database Management

Manage your data efficiently with the following commands:

- `npm run db:studio`: Open interactive database UI.
- `npm run db:push`: Force-sync schema with DB (useful for local dev).
- `npm run db:reset`: Wipe and reset the entire database.

---

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages & API)
│   ├── (auth)/        # Authentication Pages (Login, Signup)
│   ├── (public)/      # Public Routes (Landing, Items)
│   ├── (protected)/   # Routes requiring authentication
│   └── api/           # Backend API routes
├── components/        # Reusable UI components
│   ├── landing/       # Sections for the Home page
│   └── Navbar.tsx     # Global Navigation
├── lib/               # Utility functions, constants, and auth config
├── types/             # TypeScript interfaces and index
└── proxy.ts           # Authentication logic for protected routes
```

---

## 🔌 API Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/items` | Fetch all products with filter/limit params |
| `GET` | `/api/items/[id]` | Fetch a single product by ID |
| `POST` | `/api/items` | (Protected) Create a new product |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/validate`| Validate credentials for login |

---

## 🔐 Authentication & Security

- **Proxy (Middleware)**: Routes like `/items/add` are protected at the edge via `proxy.ts`.
- **RBAC**: Base for Role-Based Access Control (Admin/User) is defined in the type system.
- **Encryption**: Passwords are hashed using BCrypt before validation.
- **Session Strategy**: Uses JWT (JSON Web Tokens) for lightweight, secure authentication persistent across requests.

---

## 🔮 Future Enhancements

- [ ] **Database Integration**: Connect to MongoDB/PostgreSQL for persistent storage.
- [ ] **Shopping Cart**: Full Redux/Zustand state-managed cart and checkout.
- [ ] **Admin Dashboard**: Comprehensive stats and inventory management dashboard.
- [ ] **Stripe Payment**: Secure checkout flow integration.
- [ ] **Image Upload**: Switch from URLs to direct image uploads via Cloudinary.

---

## 📄 License

This project is licensed under the MIT License.

---

Built with ⚡ by **Custom Spark Team**.
