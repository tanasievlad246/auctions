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
# Modified to target the users service
RUN turbo prune @helios-apps/users --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Create schemas directory with correct path and permissions
# RUN mkdir -p /app/apps/services/users/src/schemas && \
#     chown -R nodejs:nodejs /app/apps/services/users/src/schemas && \
#     chmod 755 /app/apps/services/users/src/schemas

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
RUN pnpm turbo build --filter=@helios-apps/users

FROM base AS runner
WORKDIR /app
# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
# Copy the entire node_modules tree
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/users/node_modules ./apps/services/users/node_modules
COPY --from=installer --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /app/apps/services/users/dist ./apps/services/users/dist

USER nodejs
# Expose the port your users service uses
EXPOSE 3001
# Modified to point to the users service's entry point
CMD node apps/services/users/dist/main.js

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
WORKDIR /app/apps/services/users
EXPOSE 3002
CMD ["pnpm", "run", "start:dev"]
