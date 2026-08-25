import { Criminal, InvestigationReport } from '../types';
import { formatCurrency, formatDate } from './formatters';

export const downloadJSON = (data: any, filename: string = 'export.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printCriminalDossier = (criminal: Criminal) => {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    window.print();
    return;
  }

  const printHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ACN Dossier - ${criminal.name} (${criminal.criminalId})</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 12px;
      line-height: 1.4;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .classification-bar {
      background: #0f172a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-align: center;
      padding: 4px;
      margin-bottom: 15px;
      border-radius: 2px;
    }
    .title-area h1 {
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .title-area p {
      margin: 2px 0 0 0;
      font-size: 11px;
      color: #64748b;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      font-family: monospace;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 700;
      border-radius: 4px;
      text-transform: uppercase;
      margin-right: 4px;
    }
    .badge-critical { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
    .badge-high { background: #ffedd5; color: #9a3412; border: 1px solid #fb923c; }
    .badge-medium { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-low { background: #e0f2fe; color: #075985; border: 1px solid #38bdf8; }
    
    .profile-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 16px;
      margin-bottom: 16px;
      border: 1px solid #e2e8f0;
      padding: 14px;
      border-radius: 6px;
      background: #f8fafc;
    }
    .photo-frame {
      width: 140px;
      height: 140px;
      border-radius: 6px;
      border: 2px solid #0f172a;
      overflow: hidden;
      background: #e2e8f0;
    }
    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    .info-table td {
      padding: 3px 6px;
      vertical-align: top;
    }
    .info-table td.label {
      width: 130px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 10px;
    }
    .info-table td.value {
      color: #0f172a;
      font-weight: 600;
    }
    
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .callout-box {
      background: #eff6ff;
      border-left: 3px solid #2563eb;
      padding: 8px 12px;
      font-size: 11px;
      color: #1e3a8a;
      margin-bottom: 12px;
      border-radius: 0 4px 4px 0;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-bottom: 12px;
    }
    .data-table th {
      background: #f1f5f9;
      color: #475569;
      text-align: left;
      padding: 5px 8px;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      border-bottom: 1px solid #cbd5e1;
    }
    .data-table td {
      padding: 5px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    .footer {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px dashed #94a3b8;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #64748b;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="classification-bar">
    ACN CRIMINAL INTELLIGENCE DIVISION // CLASSIFIED // LAW ENFORCEMENT SENSITIVE
  </div>

  <div class="header">
    <div class="title-area">
      <h1>OFFICIAL TARGET INTELLIGENCE DOSSIER</h1>
      <p>Autonomous Criminal Network Threat Assessment & Forensic Profile</p>
    </div>
    <div class="meta-box">
      <div><strong>DOSSIER ID:</strong> ${criminal.criminalId}</div>
      <div><strong>DATE PRINTED:</strong> ${new Date().toUTCString()}</div>
      <div><strong>CLEARANCE:</strong> TOP SECRET // NOFORN</div>
    </div>
  </div>

  <div class="profile-grid">
    <div class="photo-frame">
      <img src="${criminal.photoUrl}" alt="${criminal.name}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'" />
    </div>
    <div>
      <table class="info-table">
        <tr>
          <td class="label">Primary Identity:</td>
          <td class="value">${criminal.name} (Alias: "${criminal.alias}")</td>
        </tr>
        <tr>
          <td class="label">Threat Level:</td>
          <td class="value">
            <span class="badge badge-${criminal.riskLevel.toLowerCase()}">${criminal.riskLevel} (${criminal.riskScore}/100)</span>
            <span class="badge" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1">${criminal.status}</span>
          </td>
        </tr>
        <tr>
          <td class="label">Crime Category:</td>
          <td class="value">${criminal.crimeCategory}</td>
        </tr>
        <tr>
          <td class="label">Nationality / Age:</td>
          <td class="value">${criminal.nationality} • ${criminal.age} Years (${criminal.gender})</td>
        </tr>
        <tr>
          <td class="label">Date of Birth:</td>
          <td class="value">${criminal.personalDetails?.dob || 'Classified'}</td>
        </tr>
        <tr>
          <td class="label">Fingerprint Record:</td>
          <td class="value" style="font-family:monospace">${criminal.personalDetails?.fingerprintId || 'FP-ACN-88219'}</td>
        </tr>
        <tr>
          <td class="label">Last Known Location:</td>
          <td class="value">${criminal.lastKnownLocation.address}, ${criminal.lastKnownLocation.city}, ${criminal.lastKnownLocation.country}</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="section-title">AI Threat Assessment & Strategic Interdiction Synopsis</div>
  <div class="callout-box">
    <strong>NEURAL RISK ASSESSMENT:</strong> ${criminal.aiThreatSummary}
  </div>

  <div class="section-title">Investigative Biography & Known History</div>
  <p style="margin:0 0 12px 0; color:#334155; font-size:11px; text-align:justify;">
    ${criminal.biography}
  </p>

  ${criminal.knownAssociates && criminal.knownAssociates.length > 0 ? `
  <div class="section-title">Known Associates & Direct Linkages (${criminal.knownAssociates.length})</div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Associate Name</th>
        <th>Alias</th>
        <th>Syndicate Role</th>
        <th>Relationship</th>
        <th>Risk Score</th>
      </tr>
    </thead>
    <tbody>
      ${criminal.knownAssociates.map(a => `
      <tr>
        <td><strong>${a.name}</strong></td>
        <td>"${a.alias}"</td>
        <td>${a.role}</td>
        <td>${a.relationship}</td>
        <td>${a.riskScore}/100</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${criminal.phoneNumbers && criminal.phoneNumbers.length > 0 ? `
  <div class="section-title">Monitored Telecommunications & Wiretaps (${criminal.phoneNumbers.length})</div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Phone Number</th>
        <th>Carrier</th>
        <th>IMEI Telemetry</th>
        <th>Calls Intercepted</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${criminal.phoneNumbers.map(p => `
      <tr>
        <td style="font-family:monospace"><strong>${p.phoneNumber}</strong></td>
        <td>${p.carrier}</td>
        <td style="font-family:monospace">${p.imei}</td>
        <td>${p.totalCallsLogged} calls</td>
        <td>${p.status}</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  ${criminal.financialAccounts && criminal.financialAccounts.length > 0 ? `
  <div class="section-title">Monitored Financial Accounts & Ghost Wallets (${criminal.financialAccounts.length})</div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Financial Institution</th>
        <th>Account / Wallet Identifier</th>
        <th>Account Type</th>
        <th>Monitored Balance</th>
        <th>Flagged Wires</th>
      </tr>
    </thead>
    <tbody>
      ${criminal.financialAccounts.map(f => `
      <tr>
        <td><strong>${f.bankName}</strong></td>
        <td style="font-family:monospace">${f.accountNumber}</td>
        <td>${f.accountType}</td>
        <td><strong>${formatCurrency(f.balance, f.currency)}</strong></td>
        <td style="color:#b91c1c">${f.flaggedTransactionsCount} Suspicious Transfers</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
  ` : ''}

  <div class="footer">
    <div>ACN CLASSIFIED RECORD // VERIFIED AUTHENTICITY CODE: ACN-SEC-${Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
    <div>PAGE 1 OF 1 • FOR AUTHORIZED LAW ENFORCEMENT OPERATIVES ONLY</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();
};

export const printInvestigationReport = (report: InvestigationReport) => {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    window.print();
    return;
  }

  const printHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ACN Report - ${report.reportNumber}</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 12px;
      line-height: 1.4;
    }
    .classification-bar {
      background: #991b1b;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-align: center;
      padding: 4px;
      margin-bottom: 15px;
      border-radius: 2px;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title-area h1 {
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .title-area p {
      margin: 3px 0 0 0;
      font-size: 11px;
      color: #64748b;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      font-family: monospace;
    }
    .summary-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 12px 14px;
      border-radius: 6px;
      margin-bottom: 16px;
      color: #1e293b;
      font-size: 11.5px;
      line-height: 1.5;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 16px;
    }
    .metric-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 8px 10px;
      border-radius: 4px;
      text-align: center;
    }
    .metric-label {
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      display: block;
    }
    .metric-val {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 2px;
      display: block;
      font-family: monospace;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .finding-item {
      padding: 8px 10px;
      background: #f8fafc;
      border-left: 3px solid #0f172a;
      margin-bottom: 6px;
      border-radius: 0 4px 4px 0;
      font-size: 11px;
      color: #334155;
    }
    .footer {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px dashed #94a3b8;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #64748b;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="classification-bar">
    ${report.classificationLevel} // ACN EXECUTIVE TASK FORCE
  </div>

  <div class="header">
    <div class="title-area">
      <h1>${report.title}</h1>
      <p>Specialized Case Report • Type: ${report.type} • Target: ${report.targetEntity}</p>
    </div>
    <div class="meta-box">
      <div><strong>REPORT NO:</strong> ${report.reportNumber}</div>
      <div><strong>DATE:</strong> ${formatDate(report.dateGenerated)}</div>
      <div><strong>AUTHOR:</strong> ${report.author}</div>
    </div>
  </div>

  <div class="section-title">Executive Intelligence Summary</div>
  <div class="summary-card">
    ${report.summary}
  </div>

  <div class="section-title">Analytical Metrics & Network Topology Indicators</div>
  <div class="metrics-grid">
    ${Object.entries(report.metrics || {}).map(([key, val]) => `
    <div class="metric-card">
      <span class="metric-label">${key}</span>
      <span class="metric-val">${val}</span>
    </div>
    `).join('')}
  </div>

  <div class="section-title">Key Analytical Findings & Forensic Evidence Trail</div>
  <div>
    ${(report.keyFindings || []).map((f, i) => `
    <div class="finding-item">
      <strong>Item #${i + 1}:</strong> ${f}
    </div>
    `).join('')}
  </div>

  <div class="footer">
    <div>ACN SECURE BRIEF // CASE DISPATCH: ${report.reportNumber}</div>
    <div>CLASSIFIED INTELLIGENCE • ALL RIGHTS RESERVED</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();
};

export const triggerPrintDossier = (target: string | Criminal | InvestigationReport) => {
  if (typeof target === 'object' && target !== null) {
    if ('criminalId' in target) {
      printCriminalDossier(target as Criminal);
      return;
    }
    if ('reportNumber' in target) {
      printInvestigationReport(target as InvestigationReport);
      return;
    }
  }
  window.print();
};
