# Use the official Node.js image
FROM node:20-slim AS base

# Install pnpm
RUN npm install -g pnpm@9.15.9

# Set the working directory
WORKDIR /app

# Copy the entire workspace
COPY . .

# Install all dependencies (including workspaces)
RUN pnpm install

# Build all projects and run the post-build script to sync 'public'
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the universal engine
CMD ["pnpm", "start"]
