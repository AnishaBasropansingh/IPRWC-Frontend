# -------- Build stage: compile SSR + browser bundles --------
FROM node:24-alpine AS build
WORKDIR /app

# Install deps (cached layer)
COPY package*.json ./
RUN npm ci

# Copy source and build SSR (adjust if your script name differs)
COPY . .
# Typical script name created by @nguniversal/express-engine schematics
# e.g. "build:ssr": "ng build --configuration=production && ng run <app>:server:production"
ARG BUILD_SSR_SCRIPT="build"
RUN npm run ${BUILD_SSR_SCRIPT}

# -------- Runtime stage: run Node SSR server --------
FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
# DigitalOcean App Platform expects your app to listen on 8080
ENV PORT=8080
EXPOSE 8080

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts
COPY --from=build /app/dist ./dist

# ====== IMPORTANT ======
# Your project name is the folder right under dist/, e.g. dist/my-app/{browser,server}
# Set APP_NAME below or pass at build time:
#   docker build --build-arg APP_NAME=my-app -t my-angular-ssr .
ARG APP_NAME
ENV APP_NAME=webshop-frontend

# Start the Universal server
# (Shell form lets $APP_NAME expand; ensures we run the right main.js)
CMD node dist/$APP_NAME/server/server.mjs
