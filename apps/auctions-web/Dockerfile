FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install -g pnpm turbo
COPY . .
RUN turbo prune @helios-apps/auctions-web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
# Enable corepack in installer stage
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
# Use corepack to ensure correct package manager version
RUN npm install -g pnpm

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm install --no-frozen-lockfile
# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build --filter=@helios-apps/auctions-web

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/auctions-web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/auctions-web/.next/static ./apps/auctions-web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/auctions-web/public ./apps/auctions-web/public

WORKDIR /app/apps/auctions-web
EXPOSE 8080

CMD ["node", "server.js"]

FROM base AS development
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm
# Copy all pruned files
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY --from=builder /app/out/full/ .
# Expose the port your app runs on
WORKDIR /app/apps/auctions-web
EXPOSE 8080
# Start the app
CMD ["pnpm", "dev"]
