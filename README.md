# Zebra Technologies | Jira Epic Analyzer & QA Gap Analysis Tool

A professional, full-stack web application for analyzing Jira epics and identifying QA gaps. Built with Python backend, clean HTML/CSS/JS frontend, and optimized for enterprise environments.

## Features

### 📊 Epic Analysis
- Fetch Jira epic details with all child issues
- Automatic High Level Status table extraction
- Readiness analysis and exception reporting

### 📋 Excel Reports
- Professional formatted Excel workbooks
- Multi-sheet reports with summary and detailed data
- Automatic Excel generation in `reports/` folder

### 🔍 QA Gap Analysis
- Identify differences between requirements and test coverage
- Coverage mapping and evidence quality verification
- Requirement alignment checks

### 🎨 Professional UI
- Clean, responsive design inspired by Zebra Technologies branding
- Multiple pages: Home, About, Analyzer
- Real-time API integration with backend

## Project Structure

```
dqrd-project - v2/
├── frontend/                    # Web UI (HTML/CSS/JS)
│   ├── index.html              # Home page
│   ├── about.html              # About/Overview page
│   ├── analyzer.html           # Feature Analyzer tool
│   ├── css/
│   │   └── style.css           # Unified styling
│   ├── js/
│   │   ├── main.js             # Navigation & common logic
│   │   └── analyzer.js         # Analyzer page functionality
│   └── assets/
│       └── favicon.svg         # Zebra logo favicon
├── backend/                     # Python backend (optional for organization)
├── jira_epic_fetcher.py        # Main Python backend + web server
├── requirements.txt             # Python dependencies
├── .env                        # Jira credentials (create from .env.example)
├── .env.example                # Template for .env
└── reports/                    # Generated Excel reports (auto-created)
```

## Prerequisites

- Python 3.10+
- Jira account with project access
- Jira Personal Access Token (PAT)

## Setup

### 1. Clone and prepare the environment

```bash
cd "c:\Users\sb9747\Desktop\dqrd-project - v2"
```

### 2. Create `.env` file

Copy `.env.example` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
JIRA_BASE_URL=https://jira.zebra.com
JIRA_PAT=your_jira_personal_access_token
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 🚀 Quick Start

**Run the complete application:**

```bash
python jira_epic_fetcher.py
```

Then open your browser to:
```
http://127.0.0.1:8000
```

Navigate through:
- **Home** — Welcome page with feature overview
- **About** — Detailed information about QA Gap Analysis
- **Analyzer** — Enter an epic ID and generate reports

## 📝 Usage

### Web UI (Recommended)

1. Start the app: `python jira_epic_fetcher.py`
2. Open browser to `http://127.0.0.1:8000`
3. Click "Analyzer" in the navigation
4. Enter an epic ID (e.g., `DQRD-10393`)
5. Click "ANALYZE FEATURE"
6. View the generated Excel report path in the result

### CLI Mode (Alternative)

Run from terminal with a specific epic:
```bash
python jira_epic_fetcher.py DQRD-10393
```

Interactive input mode:
```bash
python jira_epic_fetcher.py
```

Other options:
```bash
# With custom Excel path
python jira_epic_fetcher.py DQRD-10393 --excel reports/custom-report.xlsx

# Show details in terminal
python jira_epic_fetcher.py DQRD-10393 --console

# Show readiness summary
python jira_epic_fetcher.py DQRD-10393 --summary

# Run on custom host/port
python jira_epic_fetcher.py --serve --host 0.0.0.0 --port 8080
```

## 📊 Generated Reports

Excel reports include:
- **Epic Summary** — Epic metadata and details
- **Issues in Epic** — All child issues with status
- **High Level Status** — Extracted status tables
- **Readiness Summary** — Overall readiness analysis
- **Readiness Exceptions** — Issues requiring attention

## 🎯 Example Epic IDs

```
- DQRD-10393
- DQRD-10400
- DQRD-10401
- ZRSC-4862
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
JIRA_BASE_URL=https://jira.zebra.com
JIRA_PAT=your_jira_personal_access_token
```

### Web Server Options

```bash
# Custom host/port
python jira_epic_fetcher.py --serve --host 0.0.0.0 --port 3000

# Available options
--serve         # Start web server (default if no CLI args)
--host          # Server host (default: 127.0.0.1)
--port          # Server port (default: 8000)
```

## 🎨 Frontend Pages

### Home Page (`index.html`)
- Welcome banner with diagonal stripe background
- Quick feature overview cards
- CTA button to start analyzing

### About Page (`about.html`)
- QA Gap Analysis explanation
- Feature cards with benefits
- Three pillars: Requirement Alignment, Coverage Mapping, Evidence Quality

### Analyzer Page (`analyzer.html`)
- Clean form for epic ID input
- Real-time API integration
- Success/error feedback
- Loading states with spinner

## 🔌 API Endpoints

### POST `/api/fetch-epic`

**Request:**
```json
{
  "epic_id": "DQRD-10393"
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "epic_id": "DQRD-10393",
  "excel_path": "/full/path/to/reports/DQRD-10393_20260316_120000.xlsx",
  "message": "Excel report generated successfully."
}
```

**Error Response (400/500):**
```json
{
  "ok": false,
  "error": "Error message describing what went wrong"
}
```

## 📋 Notes

- The script queries Jira using standard JQL patterns
- First tries `"Epic Link" = DQRD-XXXXX`, then falls back to `parent = DQRD-XXXXX`
- Automatically creates `reports/` folder if it doesn't exist
- Supports both Cloud and Server Jira instances
- High Level Status tables are extracted from custom fields automatically

## 🐛 Troubleshooting

### "Missing required environment variable"
- Create `.env` file with `JIRA_BASE_URL` and `JIRA_PAT`
- Copy from `.env.example` and fill in your credentials

### "Failed to fetch issue"
- Verify Jira URL is correct
- Confirm PAT token has project access
- Check epic ID exists and is spelled correctly

### Web server won't start
- Check if port 8000 is already in use
- Try: `python jira_epic_fetcher.py --serve --port 8080`
- Ensure Python 3.10+ is installed

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify `.env` credentials are correct
3. Test with CLI mode first: `python jira_epic_fetcher.py DQRD-10393`
4. Check Python version: `python --version`

## 📄 License

Internal Zebra Technologies tool.

---

**Version:** 2.0  
**Last Updated:** March 2026

