FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PUBLIC_API_BASE_URL=http://firststep-app.com/api
ENV NEXT_PUBLIC_X_AUTHORIZATION=teKUBo0j8MCBe0hENqcPniLQbchaYM0t4LXV9y2jdycN7GNQYN4aMy9r3tLjxigm
ENV NEXT_PUBLIC_X_AUTHORIZATION_SECRET=aqpDqcw13QYMpyJwd7aGKDO5H1rTJZvYEK4c2w7NCFZalQ83MSVYX2TXW5hj3BcE

RUN npm run build --force

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]