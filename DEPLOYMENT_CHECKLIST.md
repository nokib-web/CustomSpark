# 🚀 Pre-Deployment Checklist

## Before Deploying to Vercel

### 1. Environment Setup ✅
- [x] `.env.local` contains all required variables
- [x] `.env.example` has placeholder values (safe to commit)
- [x] `.gitignore` protects `.env.local` from being committed

### 2. Database Setup
- [ ] Production PostgreSQL database created (Supabase/Neon/Railway)
- [ ] Production DATABASE_URL obtained
- [ ] Database password is URL-encoded if it contains special characters

### 3. Google OAuth Setup
- [ ] Production redirect URI added to Google Console:
  - `https://your-app-name.vercel.app/api/auth/callback/google`
- [ ] OAuth credentials are ready

### 4. Local Testing
- [ ] Run `npm run build` successfully
- [ ] Test the production build with `npm start`
- [ ] All features work correctly

### 5. Vercel Configuration
- [ ] `vercel.json` is configured (already done ✅)
- [ ] All environment variables ready to add in Vercel dashboard

## Required Environment Variables for Vercel

Copy these to Vercel Dashboard > Settings > Environment Variables:

```bash
# Authentication
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=3faec416800055022bad847f8d2084cf1a9e823b2e3f6ee812aa2c7132a10b49

# Google OAuth
GOOGLE_CLIENT_ID=1089799694072-m3i04u1p2lh4mdc125dmef6djooklcqk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Database (Use your production database URL)
DATABASE_URL=postgresql://postgres:password@host:5432/database
```

## Deployment Steps

1. **Test Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Add all variables listed above

4. **Run Database Migration**
   ```bash
   # Using your production DATABASE_URL
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Test Production Deployment**
   - Visit your Vercel URL
   - Test authentication
   - Test creating items
   - Verify all pages load

## Common Issues & Solutions

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Test `npm run build` locally

### Database Connection Error
- Verify DATABASE_URL is set in Vercel
- Check password is URL-encoded
- Ensure database is accessible from Vercel's servers

### OAuth Error
- Add Vercel URL to Google OAuth redirect URIs
- Update NEXTAUTH_URL to match deployment URL

## Post-Deployment

- [ ] Test all features on production
- [ ] Set up custom domain (optional)
- [ ] Monitor Vercel Analytics
- [ ] Check Function logs for errors

---

**Ready to deploy?** Follow the detailed guide in `VERCEL_DEPLOYMENT.md`
