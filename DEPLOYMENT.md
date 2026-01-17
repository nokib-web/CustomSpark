# Vercel Deployment Guide

## Prerequisites
- A PostgreSQL database (Supabase, Neon, Railway, or similar)
- Google OAuth credentials for authentication
- A Vercel account

## Environment Variables

Set the following environment variables in Vercel:

### Database
- `DATABASE_URL`: Your PostgreSQL connection string

### Authentication
- `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://yourdomain.vercel.app`)
- `NEXTAUTH_SECRET`: A random 32-character secret (generate with `openssl rand -base64 32`)

### Google OAuth
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

## Deployment Steps

1. **Push to GitHub**: Ensure your code is on GitHub
   ```bash
   git add .
   git commit -m "deployment ready"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from the section above
   - Ensure values match your production setup

4. **Database Setup**:
   - The database schema will be created automatically via Prisma migrations
   - For first deployment, you may need to run migrations manually
   - If needed, use the Vercel CLI: `vercel env pull` then `npx prisma migrate deploy`

5. **Deploy**:
   - Vercel will automatically deploy on every push to `main` branch
   - Monitor deployment in Vercel Dashboard

## Troubleshooting

### Build Fails: "DATABASE_URL not found"
- Ensure `DATABASE_URL` is set in Vercel environment variables
- The build will still succeed even if the database isn't accessible during build

### Database Connection Issues
- Verify your database is accessible from Vercel
- Check database firewall/IP whitelist settings
- For Supabase: Ensure IPv4 is enabled in Network settings

### Google OAuth Issues
- Verify redirect URIs in Google Console include your Vercel domain
- Check that `NEXTAUTH_URL` exactly matches your deployment domain

## Post-Deployment

1. Test the application at your Vercel URL
2. Verify authentication (Google OAuth and email/password)
3. Test database operations (create items, view dashboard)
4. Monitor logs in Vercel Dashboard for any errors

## Scaling & Optimization

- Consider Prisma Accelerate for improved query performance
- Use Vercel Analytics to monitor performance
- Set up automated backups for your PostgreSQL database
