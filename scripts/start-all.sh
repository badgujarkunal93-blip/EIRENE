#!/usr/bin/env bash
# ==============================================================================
# EIRENE Platform - Local Development Startup Script (Bash)
# ==============================================================================

set -e

echo "=========================================================="
echo "🌿 Starting EIRENE - Elderly Care Management Platform..."
echo "=========================================================="

# Check env files
if [ ! -f "backend/.env" ]; then
    echo "Copying backend/.env.example to backend/.env..."
    cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    echo "Copying frontend/.env.example to frontend/.env..."
    cp frontend/.env.example frontend/.env
fi

echo "Starting Backend and Frontend concurrently..."
(cd backend && npm run start:dev) &
(cd frontend && npm run dev) &

wait
