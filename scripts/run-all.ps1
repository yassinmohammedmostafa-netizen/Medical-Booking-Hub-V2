$env:Path = "C:\Users\yassinMMK\AppData\Local\pnpm;C:\Users\yassinMMK\AppData\Local\ms-playwright-go\1.57.0;" + $env:Path
$env:BACKEND_PORT = "5000"
$env:PORT = "8080"
$env:BASE_PATH = "/"
$env:DATABASE_URL = "file:D:/MedicalBooking-Hub/sqlite.db"
$env:SESSION_SECRET = "temp-secret-for-dev"
$env:NODE_ENV = "development"
$env:APP_URL = "http://192.168.100.182:8080"

$env:RESEND_API_KEY = "re_PF3KJZap_8EeccjbjSFdoHqFUcwcLqXW3"
$env:EMAIL_FROM = "onboarding@resend.dev"

Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c", "set PORT=$env:BACKEND_PORT && set DATABASE_URL=$env:DATABASE_URL && set SESSION_SECRET=$env:SESSION_SECRET && set NODE_ENV=$env:NODE_ENV && set APP_URL=$env:APP_URL && set RESEND_API_KEY=$env:RESEND_API_KEY && set EMAIL_FROM=$env:EMAIL_FROM && pnpm -C artifacts/api-server run dev"

Write-Host "Starting Frontend on port $env:PORT..." -ForegroundColor Cyan
pnpm -C artifacts/esaal run dev
