# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy backend package.json
COPY backend/package*.json ./backend/

# Copy frontend package.json
COPY frontend/package*.json ./frontend/

# Install dependencies using root build script
RUN npm run build

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application using root start script
CMD ["npm", "start"]