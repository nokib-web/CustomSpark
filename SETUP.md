# 🛠 Custom Spark Setup Guide

This guide provides detailed instructions on how to configure the environment variables and external services required to run Custom Spark.

---

## 🔐 1. NextAuth Secret

The `NEXTAUTH_SECRET` is used to encrypt JWT tokens and sign cookies. It should be a long, random string.

### How to generate:
You can generate a secure secret using any of the following methods:

- **Terminal (OpenSSL)**:
  ```bash
  openssl rand -base64 32
  ```
- **Online Generator**: Use a secure tool like [PasswordGenerator.net](https://www.passwordgenerator.net/) (set to 32+ characters).
- **Node.js**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

---

## 🌐 2. Google OAuth Credentials

To enable Google Sign-In, you need to register an application in the Google Cloud Console.

### Step-by-Step:
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create a New Project**: Click the project dropdown and select "New Project". Give it a name like `CustomSpark`.
3.  **Configure OAuth Consent Screen**:
    *   Navigate to **APIs & Services > OAuth consent screen**.
    *   Select **External** and fill in the required app information (App name, support email, developer contact).
4.  **Create Credentials**:
    *   Go to **APIs & Services > Credentials**.
    *   Click **+ Create Credentials** and select **OAuth client ID**.
    *   Select **Web application** as the Application type.
    *   **Authorized JavaScript origins**: Add `http://localhost:3000`.
    *   **Authorized redirect URIs**: Add `http://localhost:3000/api/auth/callback/google`.
    *   Click **Create**.
5.  **Copy IDs**: You will see your **Client ID** and **Client Secret**. Paste these into your `.env` file.

---

## 🚀 3. Common Setup Issues

### "Invalid Callback URL"
**Symptoms**: After clicking Google Login, you see an error page from Google.
**Solution**: Ensure your **Authorized redirect URIs** in Google Cloud Console exactly matches `http://localhost:3000/api/auth/callback/google`. Any typo will cause a mismatch error.

### "NextAuth Secret Missing"
**Symptoms**: Authentication fails immediately or the server logs show a warning about a missing secret.
**Solution**: Ensure `NEXTAUTH_SECRET` is defined in your `.env` file (not `.env.example`). Remember to restart your server after changing environment variables.

### "Google OAuth 403: access_denied"
**Symptoms**: You can see the login screen but cannot log in with certain accounts.
**Solution**: If your OAuth Consent Screen is in "Testing" mode, you must explicitly add user email addresses under "Test users" in the Google Cloud Console.

---

## 🏁 4. Final Checklist
- [ ] `.env` file created (copy of `.env.example`).
- [ ] `NEXTAUTH_URL` matches your local/production URL.
- [ ] Google Client ID and Secret are correct.
- [ ] Server restarted after setup.

Happy Coding! ⚡
