@echo off
title Electronic Retail Server
echo 🚀 Starting Electronic Retail System Setup...
echo.
echo 📦 Step 1: Installing Dependencies...
call npm.cmd install express @supabase/supabase-js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Failed to install. Make sure Node.js is installed.
    pause
    exit /b
)
echo.
echo 🚀 Step 2: Starting the Server...
echo ----------------------------------------------------
echo PLEASE KEEP THIS WINDOW OPEN!
echo ----------------------------------------------------
node server.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Server stopped.
    pause
)
pause
