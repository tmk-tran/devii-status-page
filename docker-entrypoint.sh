#!/bin/sh

set -eu # Stop on errors and undefined variables

# Require the runtime variable(s)
: "${VITE_API_BASE_URL:?VITE_API_BASE_URL must be provided}"
: "${VITE_API_TENANTID:?VITE_API_TENANTID must be provided}"

# Replaces shell-style placeholders with environment-variable values,
# > Generate browser-readable config
envsubst '${VITE_API_BASE_URL} ${VITE_API_TENANTID}' \
  < /usr/share/nginx/html/runtime-config.js.template \
  > /usr/share/nginx/html/runtime-config.js

# Start Nginx
exec nginx -g "daemon off;"