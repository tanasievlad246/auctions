FROM node:20-alpine AS base

FROM base AS builder
# Add libc6-compat for Alpine
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Install pnpm and turbo
RUN npm install -g pnpm turbo
COPY . .
# Modified to target the auctions service
RUN turbo prune @helios-apps/gateway --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
# Copy all pruned files
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy source code
COPY --from=builder /app/out/full/ .
# Build the project
RUN pnpm turbo build --filter=@helios-apps/gateway

FROM base AS runner
WORKDIR /app
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
# Copy the entire node_modules tree
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/gateway/node_modules ./apps/services/gateway/node_modules
COPY --from=installer --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/gateway/dist ./apps/services/gateway/dist

USER nodejs
# Expose the port your gateway service uses
EXPOSE 3001
# Modified to point to the gateway service's entry point
CMD node apps/services/gateway/dist/main.js

FROM base AS development
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
# Copy all pruned files
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy source code
COPY --from=builder /app/out/full/ .
# Build the project
WORKDIR /app/apps/services/gateway
EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]

