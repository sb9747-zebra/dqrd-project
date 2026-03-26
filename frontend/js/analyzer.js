const analyzerForm = document.getElementById('analyzerForm');
const epicIdInput = document.getElementById('epicIdInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisResult = document.getElementById('analysisResult');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsSection = document.getElementById('resultsSection');
const summaryGrid = document.getElementById('summaryGrid');
const exceptionsList = document.getElementById('exceptionsList');
const exceptionsSection = document.getElementById('exceptionsSection');
const reportPath = document.getElementById('reportPath');
const downloadBtn = document.getElementById('downloadBtn');
const analyzeAgainBtn = document.getElementById('analyzeAgainBtn');

// Store the current excel path for download
let currentExcelPath = null;

if (analyzerForm && epicIdInput && analyzeBtn && analysisResult) {
  analyzerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const epicId = epicIdInput.value.trim().toUpperCase();

    // Reset states
    analysisResult.className = 'analysis-result';
    analysisResult.textContent = '';
    loadingSpinner.style.display = 'none';
    resultsSection.classList.remove('show');

    if (!epicId) {
      analysisResult.classList.add('error');
      analysisResult.textContent = '✗ Please enter an Epic ID (e.g., DQRD-10393).';
      return;
    }

    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'ANALYZING...';
    loadingSpinner.style.display = 'block';

    try {
      const response = await fetch('/api/fetch-epic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ epic_id: epicId }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Failed to analyze epic.');
      }

      // Display success message
      analysisResult.classList.add('success');
      analysisResult.textContent = `✓ Epic analysis completed successfully!`;

      // Display readiness results if available
      if (payload.readiness_summary) {
        displayResults(payload);
      }

      // Store file path for download
      if (payload.excel_path) {
        currentExcelPath = payload.excel_path;
        downloadBtn.style.display = 'inline-block';
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error occurred.';
      analysisResult.classList.add('error');
      analysisResult.textContent = `✗ Error: ${message}`;
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'ANALYZE FEATURE';
      loadingSpinner.style.display = 'none';
    }
  });
}

function displayResults(payload) {
  const summary = payload.readiness_summary;
  const exceptions = payload.readiness_exceptions || [];

  // Display summary cards
  summaryGrid.innerHTML = `
    <div class="summary-card">
      <div class="summary-value">${summary.total_issues || 0}</div>
      <div class="summary-label">Total Issues</div>
    </div>
    <div class="summary-card">
      <div class="summary-value" style="color: #4caf50;">${summary.ready_count || 0}</div>
      <div class="summary-label">Ready</div>
    </div>
    <div class="summary-card">
      <div class="summary-value" style="color: #ff9800;">${summary.attention_count || 0}</div>
      <div class="summary-label">Needs Attention</div>
    </div>
    <div class="summary-card">
      <div class="summary-value" style="color: #f44336;">${summary.failed_count || 0}</div>
      <div class="summary-label">Failed</div>
    </div>
  `;

  // Display exceptions
  if (exceptions.length === 0) {
    exceptionsList.innerHTML = '<div class="no-exceptions">✓ No readiness exceptions found. All items are ready!</div>';
  } else {
    const uniqueIssueKeys = Array.from(
      new Set(
        exceptions
          .map(exc => (exc.issue_key || '').trim())
          .filter(Boolean)
      )
    );

    const idCardHtml = uniqueIssueKeys.length
      ? `
      <div class="exception-ids-card">
        <div class="exception-ids-title">Exception IDs (${uniqueIssueKeys.length})</div>
        <div class="exception-ids-grid">
          ${uniqueIssueKeys
            .map(
              key => `<button type="button" class="exception-id-chip" data-issue-key="${key}" aria-pressed="false">${key}</button>`
            )
            .join('')}
        </div>
      </div>
    `
      : '';

    const detailCardsHtml = exceptions
      .map(
        (exc) => `
      <div class="exception-item" data-issue-key="${(exc.issue_key || '').trim()}">
        <div class="exception-key">📌 ${exc.issue_key || 'Unknown'}</div>
        <div class="exception-detail"><strong>Row:</strong> ${exc.row_name || 'Unknown'}</div>
        <div class="exception-detail"><strong>Expected:</strong> ${exc.pass_metric || 'N/A'}</div>
        <div class="exception-detail"><strong>Actual:</strong> ${exc.actual_status || 'N/A'}</div>
      </div>
    `
      )
      .join('');

    exceptionsList.innerHTML = idCardHtml + detailCardsHtml;

    const idChips = exceptionsList.querySelectorAll('.exception-id-chip');
    const detailCards = exceptionsList.querySelectorAll('.exception-item');
    let activeIssueKey = '';

    const applyFilter = () => {
      detailCards.forEach(card => {
        const cardIssueKey = (card.getAttribute('data-issue-key') || '').trim();
        card.style.display = !activeIssueKey || cardIssueKey === activeIssueKey ? 'block' : 'none';
      });

      idChips.forEach(chip => {
        const chipIssueKey = (chip.getAttribute('data-issue-key') || '').trim();
        const isActive = chipIssueKey === activeIssueKey;
        chip.classList.toggle('active', isActive);
        chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    idChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const chipIssueKey = (chip.getAttribute('data-issue-key') || '').trim();
        activeIssueKey = activeIssueKey === chipIssueKey ? '' : chipIssueKey;
        applyFilter();
      });
    });

    applyFilter();
  }

  resultsSection.classList.add('show');
  
  // Show buttons
  downloadBtn.style.display = 'inline-block';
  analyzeAgainBtn.style.display = 'inline-block';

  // Scroll to results
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
}

// Download button handler
if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    if (currentExcelPath) {
      try {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = `/api/download?path=${encodeURIComponent(currentExcelPath)}`;
        link.download = currentExcelPath.split('/').pop() || 'report.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success feedback
        downloadBtn.textContent = '✓ Download Started';
        setTimeout(() => {
          downloadBtn.textContent = '📥 DOWNLOAD REPORT';
        }, 2000);
      } catch (error) {
        console.error('Download error:', error);
        downloadBtn.textContent = '✗ Download Failed';
        setTimeout(() => {
          downloadBtn.textContent = '📥 DOWNLOAD REPORT';
        }, 2000);
      }
    }
  });
}

// Analyze Again button handler
if (analyzeAgainBtn) {
  analyzeAgainBtn.addEventListener('click', () => {
    // Clear the form and results
    epicIdInput.value = '';
    analysisResult.className = 'analysis-result';
    analysisResult.textContent = '';
    resultsSection.classList.remove('show');
    downloadBtn.style.display = 'none';
    analyzeAgainBtn.style.display = 'none';
    
    // Focus on input field
    epicIdInput.focus();
    
    // Scroll to form
    analyzerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
