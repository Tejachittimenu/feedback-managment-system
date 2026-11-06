@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run Feedback Studio.
  echo Install the current LTS version from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist "node_modules\vite" (
  echo Installing project dependencies. This may take a minute...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)
echo Starting Feedback Studio. Keep this window open while using the app.
call npm run dev -- --host 127.0.0.1
pause
