#!/usr/bin/env bash
set -x
set -e

ROOT_DIR="$(pwd)"

aws s3 mb s3://metrics.leapp.cloud
aws s3 website s3://metrics.leapp.cloud --index-document index.html --error-document error.html

aws s3 sync --acl public-read --sse --delete "$ROOT_DIR"/website s3://metrics.leapp.cloud
