FROM node:22-alpine AS base

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
RUN turbo prune @helios-apps/auctions --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Create schemas directory with correct path and permissions
# RUN mkdir -p /app/apps/services/auctions/src/schemas && \
#     chown -R nodejs:nodejs /app/apps/services/auctions/src/schemas && \
#     chmod 755 /app/apps/services/auctions/src/schemas

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
RUN pnpm turbo build --filter=@helios-apps/auctions

FROM base AS runner
WORKDIR /app
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
# Copy the entire node_modules tree
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/auctions/node_modules ./apps/services/auctions/node_modules
COPY --from=installer --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/auctions/dist ./apps/services/auctions/dist

USER nodejs
# Expose the port your auctions service uses
EXPOSE 3001
# Modified to point to the auctions service's entry point
CMD node apps/services/auctions/dist/main.js