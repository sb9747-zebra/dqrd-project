#!/bin/bash
# Zebra Technologies - Jira Epic Analyzer
# Quick Start Script for Linux/Mac

echo ""
echo "========================================"
echo "Zebra Technologies - Epic Analyzer"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.10+ and try again"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "Warning: .env file not found!"
    echo "Creating from .env.example..."
    cp .env.example .env
    echo ""
    echo "Please edit .env with your Jira credentials:"
    echo "  JIRA_BASE_URL=https://jira.zebra.com"
    echo "  JIRA_PAT=your_personal_access_token"
    echo ""
    exit 1
fi

# Check if requirements are installed
if ! pip3 show openpyxl &> /dev/null; then
    echo ""
    echo "Installing required dependencies..."
    pip3 install -r requirements.txt
    echo ""
fi

# Start the web server
echo ""
echo "Starting Zebra Epic Analyzer..."
echo ""
echo "Web UI will open at: http://127.0.0.1:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 jira_epic_fetcher.py
