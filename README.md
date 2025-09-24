# **Cigarette Counter 🚬**

A MERN stack application for tracking cigarette consumption with detailed statistics and mood tracking. Built with MongoDB, Express.js, React, and Node.js.

## **✨ Features**

- 📝 Log cigarette entries with brand, quantity, location, and mood
- 📊 Comprehensive statistics dashboard (daily, weekly, monthly totals)
- 🎯 Track consumption patterns and habits
- 📱 Responsive design with Tailwind CSS and DaisyUI
- ⚡ Real-time updates with hot-reload development
- 🔒 Rate limiting with Redis for API protection

## **🛠 Tech Stack**

- **Frontend**: React 18, Vite, Tailwind CSS, DaisyUI, React Router v7
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Additional**: Axios, React Hot Toast, Lucide Icons, Upstash Redis

## **📦 Installation**

### Clone the repository:

```bash
git clone https://github.com/kairu9k/Cigarette-Counter.git
cd Cigarette-Counter
```

### Install dependencies and build:

```bash
# Install dependencies for both backend and frontend, then build frontend
npm run build
```

Alternatively, install manually:

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install
```

### Environment Setup:

Create a `.env` file in the `backend` directory with:

```env
DB=your_mongodb_connection_string
PORT=5000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
```

## **▶️ Development**

### Start both servers (recommended):

```bash
# Terminal 1 - Backend server
cd backend
npm run dev

# Terminal 2 - Frontend server
cd frontend
npm run dev
```

### Access the application:

- **Frontend**: http://localhost:5174 (or http://localhost:5173)
- **Backend API**: http://localhost:5000/api

## **🚀 Production Deployment**

### Build for production:

```bash
npm run build
```

### Start production server:

```bash
npm start
```

The backend serves the built frontend at http://localhost:5000

## **📝 API Endpoints**

- `GET /api/entries` - Get all cigarette entries
- `POST /api/entries` - Create new entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry
- `GET /api/entries/statistics` - Get consumption statistics

## **📝 Notes**

Personal project for learning MERN stack development and exploring habit tracking applications.
