# Production Deployment Guide

## Socket.IO 404 Error Fix

### Issue
Socket.IO connection fails in production with 404 errors because the Socket.IO server (server.js) is not running in typical serverless deployments like Vercel/Netlify.

### Solution Options

## Option 1: Docker Deployment (Recommended)

Deploy the entire application (Next.js + Socket.IO) using the existing Dockerfile to a service that supports custom servers.

### Supported Platforms:
- **Railway** - https://railway.app/
- **Render** - https://render.com/
- **Fly.io** - https://fly.io/
- **DigitalOcean App Platform** - https://www.digitalocean.com/products/app-platform
- **AWS ECS / EC2**
- **Google Cloud Run**
- **Any VPS with Docker**

### Deployment Steps:

1. **Push Dockerfile to GitHub** (already done)

2. **Connect to deployment platform** (example: Railway)
   ```bash
   # Railway automatically detects Dockerfile
   # Just connect your GitHub repo and deploy
   ```

3. **Set environment variables in platform:**
   ```bash
   MYSQL_HOST=147.93.126.90
   MYSQL_USER=mariadb
   MYSQL_PASSWORD=L5ZvX4rExOQYf2Ud8X5xT5fG5z4cZcO05zs6BT2stgSFmAfX5rNdYi1B2XUG0Olu
   MYSQL_DATABASE=default
   MYSQL_PORT=5432
   NEXT_PUBLIC_APP_URL=https://your-app.railway.app
   NEXT_PUBLIC_SOCKET_URL=https://your-app.railway.app
   ```

4. **Deploy**
   - Platform will build Docker image
   - Run on port 3000
   - Socket.IO will be available at same domain

### Advantages:
- ✅ Single deployment
- ✅ Socket.IO and Next.js on same domain (no CORS)
- ✅ Uses existing Dockerfile
- ✅ All features work immediately

---

## Option 2: Separate Socket.IO Server

Deploy Socket.IO server separately from Next.js frontend.

### Steps:

1. **Deploy `server/` folder to hosting platform:**
   - Railway, Render, or Fly.io
   - Use `server/package.json` for deployment
   - Set environment variables in `server/.env`

2. **Deploy Next.js to Vercel/Netlify:**
   - Standard Next.js deployment
   - Set environment variable:
     ```bash
     NEXT_PUBLIC_SOCKET_URL_PROD=https://your-socket-server.railway.app
     ```

3. **Configure CORS on Socket.IO server:**
   ```javascript
   // In server/index.js or server.js
   const io = new Server(httpServer, {
     cors: {
       origin: "https://your-nextjs-app.vercel.app",
       methods: ["GET", "POST"]
     }
   });
   ```

### Advantages:
- ✅ Frontend on Vercel (fast CDN)
- ✅ Separate scaling for Socket.IO
- ❌ Requires CORS configuration
- ❌ Two separate deployments to manage

---

## Option 3: Disable Chat in Production (Temporary)

If you want to deploy quickly without Socket.IO:

1. **Hide ChatWidget in production:**
   ```tsx
   // In src/app/layout.tsx or pages using ChatWidget
   {process.env.NODE_ENV === 'development' && <ChatWidget />}
   ```

2. **Deploy to Vercel/Netlify normally**

### Advantages:
- ✅ Quick deployment
- ❌ No chat functionality in production

---

## Current Status

- **Local Development:** ✅ Working (server.js with Socket.IO)
- **Production:** ❌ Socket.IO 404 errors (no server.js running)
- **Database:** ✅ PostgreSQL connected (147.93.126.90:5432)

## Recommended Action

**Deploy with Docker to Railway/Render** for quickest production setup with full Socket.IO support.

### Quick Railway Deployment:

1. Go to https://railway.app/
2. Connect GitHub repository
3. Railway auto-detects Dockerfile
4. Add environment variables
5. Deploy

**Deployment time:** ~5 minutes

---

## Testing Production Socket.IO

After deployment, check browser console:
```
[Chat] Connected to Socket.io server ✅
```

If you see:
```
Failed to load resource: 404 /socket.io ❌
```

The Socket.IO server is not running on that domain.
