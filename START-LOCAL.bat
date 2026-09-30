@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  start "Vrota Poja local preview" cmd /k "py -m http.server 5500 --directory public"
  timeout /t 2 /nobreak >nul
  start "" "http://127.0.0.1:5500/"
  exit /b
)
where python >nul 2>&1
if %errorlevel%==0 (
  start "Vrota Poja local preview" cmd /k "python -m http.server 5500 --directory public"
  timeout /t 2 /nobreak >nul
  start "" "http://127.0.0.1:5500/"
  exit /b
)
echo Python nije pronadjen.
echo Instaliraj Python ili koristi Cloudflare preview/deploy.
pause
