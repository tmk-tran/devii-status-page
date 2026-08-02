# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24.16.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as build

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Copy dependency files first for better layer caching
COPY package.json yarn.lock ./

# Install all dependencies, including Vite
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN yarn run build

################################################################################

# Runtime stage: serve the compiled static files with Nginx.
FROM nginx:alpine AS final

# Install envsubst.
RUN apk add --no-cache gettext

# Copy the built SPA into Nginx's default web directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy the custom startup script.
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Allow the script to execute.
RUN chmod +x /docker-entrypoint.sh

# Nginx listens on port 80 inside the container
EXPOSE 80

# Generate runtime-config.js from the container's environment variables, then start Nginx
ENTRYPOINT ["/docker-entrypoint.sh"]