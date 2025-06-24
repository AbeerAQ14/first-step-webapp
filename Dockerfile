FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY next.config.ts ./
COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PUBLIC_API_BASE_URL=https://back.firststep-app.com/api
ENV NEXT_PUBLIC_X_AUTHORIZATION=bJPJemOddVQ2nmRP9EdKeoumMXgpq9Zlzd3cbCH6obeGKI1m7vxE2q0vAYQvtH8J
ENV NEXT_PUBLIC_X_AUTHORIZATION_SECRET=zTEr5qWx4QeeHrH1DSN8WoAkIlCdFzhULX7Eqm4VCXX9KgObn1oHgPPvDTTpkMMd

ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCEvfzLs71gr1SNqVBl6y_1j7e20znB068
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=first-step-60186.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=first-step-60186
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=first-step-60186.firebasestorage.app
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=920460640742
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:920460640742:web:e29833fc1debf3e5fad627

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