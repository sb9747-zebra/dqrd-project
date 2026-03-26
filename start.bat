@echo off
REM Zebra Technologies - Jira Epic Analyzer
REM Quick Start Script for Windows

echo.
echo ========================================
echo Zebra Technologies - Epic Analyzer
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.10+ and try again
    pause
    exit /b 1
)

REM Check if .env exists
if not exist .env (
    echo.
    echo Warning: .env file not found!
    echo Creating from .env.example...
    copy .env.example .env
    echo.
    echo Please edit .env with your Jira credentials:
    echo   JIRA_BASE_URL=https://jira.zebra.com
    echo   JIRA_PAT=your_personal_access_token
    echo.
    pause
    exit /b 1
)

REM Check if requirements are installed
pip show openpyxl >nul 2>&1
if errorlevel 1 (
    echo.
    echo Installing required dependencies...
    pip install -r requirements.txt
    echo.
)

REM Start the web server
echo.
echo Starting Zebra Epic Analyzer...
echo.
echo Web UI will open at: http://127.0.0.1:8000
echo.
echo Press Ctrl+C to stop the server
echo.

python jira_epic_fetcher.py

pause
