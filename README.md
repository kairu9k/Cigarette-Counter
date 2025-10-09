# **Cigarette Counter 🚬**

A MERN stack application for tracking cigarette consumption with detailed statistics and mood tracking. Built with MongoDB, Express.js, React, and Node.js.

## **✨ Features**

- 📝 Log cigarette entries with brand, quantity, location, and mood
- 📊 Comprehensive statistics dashboard (daily, weekly, monthly totals)
- 🎯 Track consumption patterns and habits
- 📱 Responsive design with Tailwind CSS and DaisyUI
- ⚡ Real-time updates with hot-reload development
- 🔒 Rate limiting with Redis for API protection
- 🐳 Docker support for easy deployment

## **🛠 Tech Stack**

- **Frontend**: React 18, Vite, Tailwind CSS, DaisyUI, React Router v7
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Additional**: Axios, React Hot Toast, Lucide Icons, Upstash Redis
- **DevOps**: Docker, Render (deployment)

## **🚀 Getting Started**

Follow these steps to run the Cigarette Counter application on your local machine:

### **Prerequisites**

- Node.js 18 or higher
- MongoDB database (local or cloud)
- Upstash Redis account (for rate limiting)
- Git

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/kairu9k/Cigarette-Counter.git
cd Cigarette-Counter
```

### **Step 2: Environment Setup**

Create a `.env` file in the `backend` directory:

```bash
# Navigate to backend directory
cd backend

# Create .env file (Windows)
echo. > .env

# Create .env file (macOS/Linux)
touch .env
```

Add the following environment variables to `backend/.env`:

```env
# Database
DB=mongodb://localhost:27017/cigarette-counter
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/cigarette-counter

# Server
PORT=5000
NODE_ENV=development

# Redis Rate Limiting (Get from https://upstash.com/)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### **Step 3: Install Dependencies**

From the root directory:

```bash
# Install all dependencies (backend + frontend) and build frontend
npm run build
```

**Or install manually:**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### **Step 4: Start Development Servers**

Open **two terminals** and run:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```

### **Step 5: Access the Application**

- **Frontend**: http://localhost:5174 (or http://localhost:5173)
- **Backend API**: http://localhost:5000/api

### **🗄️ Database Setup**

**Option 1: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/cigarette-counter`

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster and database
3. Get connection string and replace in `.env`

### **⚡ Redis Setup**

1. Sign up at [Upstash](https://upstash.com/)
2. Create a Redis database
3. Copy the REST URL and Token to your `.env` file

## **🐳 Docker Deployment**

### Using Docker (Recommended for Production):

```bash
# Build the Docker image
docker build -t cigarette-counter .

# Run with environment file
docker run -p 5000:5000 --env-file backend/.env cigarette-counter

# Or run with environment variables
docker run -p 5000:5000 \
  -e DB="your_mongodb_connection_string" \
  -e UPSTASH_REDIS_REST_URL="your_redis_url" \
  -e UPSTASH_REDIS_REST_TOKEN="your_redis_token" \
  -e NODE_ENV=production \
  cigarette-counter
```

## **🚀 Production Deployment**

### **Option 1: Deploy to Render (Recommended)**

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration
   - Add environment variables in the Render dashboard:
     - `DB`: Your MongoDB connection string (MongoDB Atlas recommended)
     - `UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL
     - `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token
     - `FRONTEND_URL`: Your deployed app URL (e.g., https://your-app.onrender.com)
   - Click "Create Web Service"

3. **Wait for deployment** (usually takes 3-5 minutes)

### **Option 2: Deploy with Docker**

```bash
# Build the Docker image
docker build -t cigarette-counter .

# Run with environment file
docker run -p 5001:5001 --env-file backend/.env cigarette-counter

# Or run with environment variables
docker run -p 5001:5001 \
  -e DB="your_mongodb_connection_string" \
  -e UPSTASH_REDIS_REST_URL="your_redis_url" \
  -e UPSTASH_REDIS_REST_TOKEN="your_redis_token" \
  -e NODE_ENV=production \
  cigarette-counter
```

### **Option 3: Manual Production Deployment**

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

The backend serves the built frontend at http://localhost:5001

## **📝 API Endpoints**

- `GET /api/entries` - Get all cigarette entries
- `POST /api/entries` - Create new entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry
- `GET /api/entries/statistics` - Get consumption statistics

## **📝 Notes**

Personal project for learning MERN stack development and exploring habit tracking applications.
