# ==============================================================================
# EIRENE Platform - Local Development Startup Script (PowerShell)
# Launches both backend and frontend development servers concurrently
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🌿 Starting EIRENE - Elderly Care Management Platform..." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verify Node and npm
Write-Host "Checking Node.js environment..." -ForegroundColor Yellow
node -v
npm -v

# 2. Check if .env files exist
if (-not (Test-Path "backend\.env")) {
    Write-Host "backend\.env not found. Copying from backend\.env.example..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
}
if (-not (Test-Path "frontend\.env")) {
    Write-Host "frontend\.env not found. Copying from frontend\.env.example..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.example" "frontend\.env"
}

# 3. Launch Backend in new window
Write-Host "Starting EIRENE NestJS Backend on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# 4. Launch Frontend in new window
Write-Host "Starting EIRENE React Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "EIRENE services launched successfully!" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend API: http://localhost:3000/api" -ForegroundColor White
