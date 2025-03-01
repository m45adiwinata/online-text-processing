# Stage 1: Build Stage
FROM node:23-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Install necessary dependencies for Alpine
RUN apk add --no-cache python3 make g++

# Copy package.json and lock file
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application using Vite
RUN npm run build

# Stage 2: Server Stage
FROM node:23-alpine3.20

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose the required port
EXPOSE 4173

# Run the application
CMD ["npm", "run", "preview", "--", "--host"]
