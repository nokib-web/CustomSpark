# 🛠 Custom Spark Setup Guide

This guide provides detailed instructions on how to configure your local environment, including PostgreSQL and NextAuth.

---

## � 1. PostgreSQL Database Setup

Custom Spark requires a PostgreSQL database to store users and products.

### Installing PostgreSQL locally:
1.  **Download**: Get the installer from [postgresql.org](https://www.postgresql.org/download/).
2.  **Install**: Follow the wizard. During installation:
    *   Set a password for the `postgres` user (keep this!).
    *   Default port is usually `5432`.
3.  **Create Database**: Open **pgAdmin** or use the terminal (`psql`):
    ```sql
    CREATE DATABASE ecommerce_db;
    ```

### Setting up the Connection String:
Update your `.env.local` file with your credentials:
```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/ecommerce_db?schema=public"
```

### Initializing the Database:
Run these commands in order:
```bash
# 1. Generate the Prisma Client
npm run db:generate

# 2. Setup tables and migrations
npm run db:migrate

# 3. Populate with sample items and users
npm run db:seed
```

---

## 🔐 2. NextAuth Secret

The `NEXTAUTH_SECRET` is used to encrypt JWT tokens.

### How to generate:
- **Terminal (OpenSSL)**:
  ```bash
  openssl rand -base64 32
  ```
- **Node.js**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

---

## 🌐 3. Google OAuth Credentials

To enable Google Sign-In:
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create a New Project**.
3.  **Configure OAuth Consent Screen**: Select **External**.
4.  **Create Credentials**: Select **OAuth client ID** > **Web application**.
    *   **Authorized JavaScript origins**: `http://localhost:3000`
    *   **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
5.  Copy your **Client ID** and **Client Secret** to `.env.local`.

---

## � 4. Database Management & Troubleshooting

### Useful Commands:
- `npm run db:studio`: Opens a browser-based GUI to view your data.
- `npm run db:reset`: Wipes the database and re-runs migrations and seeds.

### Common Issues:
- **"Table not found"**: Ensure you've run `npm run db:migrate` and `npm run db:generate`.
- **Connection Refused**: Check if PostgreSQL service is running and the port/password in `DATABASE_URL` is correct.
- **P1012 Validation Error**: Since we use **Prisma 7**, ensure you are not using `url = env("DATABASE_URL")` inside the `datasource` block in `schema.prisma`. It is handled via the config/adapter now.

---

## 🏁 5. Final Checklist
- [ ] `.env.local` file created.
- [ ] `DATABASE_URL` is correct and PostgreSQL is running.
- [ ] `npm run db:migrate` has been executed.
- [ ] `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set.
- [ ] Google Client ID and Secret are correct.

Happy Coding! ⚡
