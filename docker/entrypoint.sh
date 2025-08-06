#!/bin/sh
set -e

echo "Substituting environment variables into env.js:"
envsubst < /public/env.template.js > /tmp/env.js

# Generate hash based on file content
ENV_HASH=$(md5sum /tmp/env.js | cut -d' ' -f1 | cut -c1-8)

mv /tmp/env.js "/public/env.${ENV_HASH}.js"
cat "/public/env.${ENV_HASH}.js"
echo ""

# Reference hashed version in index.html
sed -i "s/env\.js/env.${ENV_HASH}.js/g" /public/index.html

# Call the original entrypoint from the base image
exec /entrypoint.sh "$@"