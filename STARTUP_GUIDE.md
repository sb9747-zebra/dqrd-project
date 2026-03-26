# STARTUP GUIDE

## Project Structure

```
dqrd-project - v2/
├── frontend/                    ← Web UI (HTML/CSS/JS)
│   ├── index.html              (Home page)
│   ├── about.html              (About page)
│   ├── analyzer.html           (Analyzer page)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── analyzer.js
│   └── assets/
│       └── favicon.svg
├── backend/                     ← Optional organization folder
├── debug/                       ← Generated debug files
├── reports/                     ← Generated Excel reports
├── jira_epic_fetcher.py        ← Main Python backend
├── requirements.txt             ← Python dependencies
├── .env                        ← Your Jira credentials (KEEP SECRET!)
├── .env.example                ← Template for .env
├── README.md                   ← Full documentation
├── STARTUP_GUIDE.md            ← This file
├── start.bat                   ← Quick start (Windows)
└── start.sh                    ← Quick start (Linux/Mac)
```

## Quick Start

### Option 1: Windows (Easiest)
Double-click `start.bat` - it handles everything!

### Option 2: Manual Setup

1. **Create `.env` file with your Jira credentials:**
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env`:
   ```
   JIRA_BASE_URL=https://jira.zebra.com
   JIRA_PAT=your_jira_personal_access_token_here
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the application:**
   ```bash
   python jira_epic_fetcher.py
   ```

4. **Open in browser:**
   ```
   http://127.0.0.1:8000
   ```

## Using the Application

### Home Page
- Welcome banner with feature overview
- Shows key capabilities

### About Page
- QA Gap Analysis explanation
- Three pillars: Requirement Alignment, Coverage Mapping, Evidence Quality
- Learn about the tool's benefits

### Analyzer Page (Main Tool)
1. Enter Epic ID (e.g., `DQRD-10393`)
2. Click "ANALYZE FEATURE"
3. View results with Excel file path
4. Generated report stored in `reports/` folder

## Example Epic IDs to Try
- DQRD-10393
- DQRD-10400
- DQRD-10401
- ZRSC-4862

## Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'openpyxl'"
**Solution:** Run `pip install -r requirements.txt`

### Problem: "Missing required environment variable"
**Solution:** 
1. Create `.env` file (copy from `.env.example`)
2. Add your Jira URL and token
3. Save and try again

### Problem: "Connection refused" or port already in use
**Solution:** Try a different port:
```bash
python jira_epic_fetcher.py --serve --port 8080
```

### Problem: Web server won't start
**Solution:** 
- Ensure Python 3.10+ installed: `python --version`
- Ensure port 8000 is free
- Check firewall settings

## Pages Overview

### Home (index.html)
- Clean diagonal stripe background (blue theme)
- Large professional heading
- Three quick feature cards
- CTA button to Analyzer

### About (about.html)
- Comprehensive project explanation
- Three feature boxes with descriptions
- Benefits list
- CTA to start analyzing

### Analyzer (analyzer.html)
- Clean form interface
- Epic ID input field
- Analysis button
- Success/error messages
- Loading spinner during processing
- Example IDs for reference

## Features

✅ Professional, responsive UI
✅ Real-time API integration
✅ Excel report generation
✅ Jira epic analysis
✅ QA gap identification
✅ Multi-page navigation
✅ Beauty diagonal stripe design
✅ Blue/white/black Zebra theme
✅ Form validation
✅ Error handling
✅ Loading states

## Support Files

- Favicon: `frontend/assets/favicon.svg`
- Styling: `frontend/css/style.css`
- Frontend JS: `frontend/js/main.js` (navigation)
- Frontend JS: `frontend/js/analyzer.js` (analyzer logic)
- Backend: `jira_epic_fetcher.py` (Python web server + Jira processing)

## Advanced Options

### Run on different host:
```bash
python jira_epic_fetcher.py --serve --host 0.0.0.0 --port 3000
```

### CLI mode (no web UI):
```bash
python jira_epic_fetcher.py DQRD-10393
```

### CLI with console output:
```bash
python jira_epic_fetcher.py DQRD-10393 --console
```

### Debug mode:
```bash
python jira_epic_fetcher.py DQRD-10393 --debug
```

---

**Ready to go!** Questions? Refer to `README.md` for comprehensive documentation.
