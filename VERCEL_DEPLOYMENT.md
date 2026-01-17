# 🚀 Vercel Deployment Guide - CustomSpark

## Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ A Vercel account (sign up at https://vercel.com)
- ✅ A production PostgreSQL database (Supabase, Neon, Railway, etc.)
- ✅ Your Google OAuth credentials configured for production

## Step 1: Set Up Production Database

### Option A: Supabase (Recommended - Free Tier Available)

1. Go to https://supabase.com and create a new project
2. Wait for the database to be provisioned
3. Go to **Project Settings** > **Database**
4. Copy the **Connection String** (URI format)
5. **Important**: The password in the connection string needs to be URL-encoded

Your `.env.local` already has a Supabase URL commented out:
```bash
DATABASE_URL=postgresql://postgres:BmVhecU4a%21kbh%2Fq@db.fgcxxtvnpzaacerrfjed.supabase.co:5432/postgres
```

### Option B: Neon (Serverless Postgres)

1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Use it as your DATABASE_URL

### Option C: Railway

1. Go to https://railway.app
2. Create a new PostgreSQL database
3. Copy the connection string

## Step 2: Update Google OAuth for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** > **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add your Vercel production URL to **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

## Step 3: Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - What's your project's name? **customspark** (or your choice)
   - In which directory is your code located? **./** 
   - Want to override settings? **N**

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

## Step 4: Configure Environment Variables in Vercel

After deployment, add these environment variables in Vercel Dashboard:

1. Go to your project in Vercel Dashboard
2. Click **Settings** > **Environment Variables**
3. Add the following variables:

### Required Environment Variables

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `DATABASE_URL` | Your production PostgreSQL URL | From Supabase/Neon/Railway |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
| `NEXTAUTH_SECRET` | `3faec416800055022bad847f8d2084cf1a9e823b2e3f6ee812aa2c7132a10b49` | Same as local |
| `GOOGLE_CLIENT_ID` | `1089799694072-m3i04u1p2lh4mdc125dmef6djooklcqk.apps.googleusercontent.com` | Your Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | `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` | Your Google OAuth Secret |

**Important**: 
- Set all variables for **Production**, **Preview**, and **Development** environments
- Click **Save** after adding each variable

## Step 5: Run Database Migrations

After deploying, you need to set up your production database:

### Option A: Using Vercel CLI

```bash
# Set the DATABASE_URL for production
export DATABASE_URL="your-production-database-url"

# Push the schema to production database
npx prisma db push

# Seed the production database (optional)
npx tsx prisma/seed.ts
```

### Option B: Using Prisma Studio

```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma studio
```

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the following:
   - ✅ Home page loads
   - ✅ Items page shows products
   - ✅ Google Sign-In works
   - ✅ Creating/editing items works
   - ✅ Dashboard loads

## Troubleshooting

### Issue: "DATABASE_URL is not defined"
**Solution**: Make sure you added DATABASE_URL in Vercel environment variables and redeployed

### Issue: "OAuth callback error"
**Solution**: 
1. Check that your Vercel URL is added to Google OAuth redirect URIs
2. Verify NEXTAUTH_URL matches your Vercel deployment URL

### Issue: "SASL: SCRAM-SERVER-FIRST-MESSAGE"
**Solution**: 
1. Ensure your database password is URL-encoded in the connection string
2. Special characters like `!`, `@`, `#`, `/` must be encoded

### Issue: Build fails
**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to test

## Post-Deployment Checklist

- [ ] Environment variables are set in Vercel
- [ ] Database schema is pushed to production
- [ ] Google OAuth redirect URIs include production URL
- [ ] Test authentication flow
- [ ] Test creating/editing items
- [ ] Check all images load correctly
- [ ] Verify API routes work

## Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Run builds and checks before deployment

## Custom Domain (Optional)

1. Go to **Settings** > **Domains** in Vercel
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain
5. Update Google OAuth redirect URIs

## Monitoring

- View deployment logs in Vercel Dashboard
- Check **Analytics** for performance metrics
- Monitor **Functions** for API route performance

---

## Quick Deploy Commands

```bash
# First time deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma with Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
