# Use Node 18 as the base
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy workspace configuration
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/esaal/package.json ./artifacts/esaal/
COPY lib/db/package.json ./lib/db/
COPY lib/api-zod/package.json ./lib/api-zod/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the whole monorepo
RUN pnpm build

# Final production stage
FROM node:18-slim
WORKDIR /app

# Install pnpm for production runs
RUN npm install -g pnpm@9

# Copy only the necessary files from builder
COPY --from=builder /app /app

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
