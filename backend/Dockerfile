FROM node:18-alpine AS builder
WORKDIR /app
# Alpine uses 'apk' instead of 'apt-get'
RUN apk update && apk upgrade
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
# Upgrade packages in the final stage too
RUN apk update && apk upgrade
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]