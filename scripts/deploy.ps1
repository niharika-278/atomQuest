# Goal Portal — production deploy (requires Docker Desktop)
# Usage: .\scripts\deploy.ps1

param()

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed." -ForegroundColor Red
    Write-Host "Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
    Write-Host "Then re-run: .\scripts\deploy.ps1"
    exit 1
}

$envFile = Join-Path $Root '.env.production'
if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $Root '.env.production.example') $envFile
    Write-Host "Created .env.production — set strong JWT secrets before real production." -ForegroundColor Yellow
}

Write-Host "Building and starting containers..." -ForegroundColor Cyan
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

Write-Host "Waiting for API health check..." -ForegroundColor Cyan
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    try {
        $r = Invoke-WebRequest -Uri 'http://localhost:3001/api/health' -UseBasicParsing -TimeoutSec 2
        if ($r.StatusCode -eq 200) {
            $ready = $true
            break
        }
    } catch {
        Start-Sleep -Seconds 2
    }
}

if ($ready) {
    Write-Host "API healthy." -ForegroundColor Green
} else {
    Write-Host "API not ready — run: docker compose -f docker-compose.prod.yml logs backend" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Deployed:" -ForegroundColor Green
Write-Host "  App:  http://localhost"
Write-Host "  API:  http://localhost:3001/api/health"
Write-Host ""
Write-Host "Seed demo users (once, from backend folder):" -ForegroundColor Cyan
Write-Host '  $env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/goal_setting_db"'
Write-Host "  npm run db:seed"
