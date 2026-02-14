# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy remaining backend files
COPY backend/ .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "App.js"]
