# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Copy the rest of the application code
COPY . .

# Install all dependencies and build frontend
RUN npm run build

# Expose the port (default 5001, can be overridden)
EXPOSE 5001

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]