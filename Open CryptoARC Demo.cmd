@echo off
setlocal

cd /d "%~dp0"

echo ============================================================
echo                CryptoARC v2 Portfolio Demo
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed on this computer.
  echo.
  echo Please install the LTS version of Node.js from:
  echo https://nodejs.org/
  echo.
  echo After installing Node.js, double-click this file again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available even though Node.js was found.
  echo Please reinstall Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo First-time setup: installing demo dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Setup failed. Please close this window and try again.
    pause
    exit /b 1
  )
)

echo Starting the demo server...
start "CryptoARC Demo Server" cmd /k "cd /d ""%~dp0"" && npm run dev -- --host 127.0.0.1 --port 4173"

echo Waiting for the demo to start...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$deadline = (Get-Date).AddSeconds(35);" ^
  "do {" ^
  "  try {" ^
  "    Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4173/ | Out-Null; exit 0" ^
  "  } catch { Start-Sleep -Milliseconds 750 }" ^
  "} while ((Get-Date) -lt $deadline);" ^
  "exit 1"

if errorlevel 1 (
  echo.
  echo The demo server did not start in time.
  echo If another window opened, check it for an error message.
  echo.
  pause
  exit /b 1
)

echo Opening the demo in your browser...
start "" http://127.0.0.1:4173/
echo.
echo You can close this window now.
echo Keep the "CryptoARC Demo Server" window open while using the demo.
echo.
pause
