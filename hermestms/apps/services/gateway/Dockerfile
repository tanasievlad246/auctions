FROM node:22-alpine AS base

FROM base AS builder
# Add libc6-compat for Alpine
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
# Modified to target the gateway service
RUN turbo prune @hermestms/gateway --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY --from=builder /app/out/json/ .
RUN yarn install

# Copy source code
COPY --from=builder /app/out/full/ .

# Build the project
RUN yarn turbo build --filter=@hermestms/gateway...

FROM base AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

# Copy needed files from installer
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/apps/services/gateway/dist ./apps/services/gateway/dist

# Expose the port your gateway service uses
EXPOSE 3000

# Modified to point to the gateway service's entry point
CMD node apps/services/gateway/dist/main.js