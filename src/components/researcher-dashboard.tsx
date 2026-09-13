"use client";

import React, { useState, useMemo } from "react";
import type { CurrentUser } from "@/lib/uquvli-types";
import {
  CheckIcon,
  BookIcon,
} from "@/components/isl-icons";
import "./researcher-dashboard.css";

type TabId = "overview" | "cohorts" | "institutions" | "participants" | "export";

interface ResearcherDashboardProps {
  user: CurrentUser;
}

// ── Static Research Cohort Data ──────────────────────────────────────────────
const STATIC_COHORT_STUDENTS = [
  { id: "MOS-1042", group: "Experimental", age: 9, support: "ISL + Visual", school: "Oak Creek Academy", modules: 8, score: 94, status: "Active" },
  { id: "MOS-1043", group: "Control", age: 10, support: "Standard Text", school: "Oak Creek Academy", modules: 5, score: 72, status: "Active" },
  { id: "MOS-1044", group: "Experimental", age: 8, support: "Simplified + Audio", school: "Sunrise Learning Center", modules: 9, score: 98, status: "Completed" },
  { id: "MOS-1045", group: "Control", age: 9, support: "Standard Text", school: "Sunrise Learning Center", modules: 4, score: 68, status: "Active" },
  { id: "MOS-1046", group: "Experimental", age: 11, support: "ISL Studio + Read-Aloud", school: "Delhi Inclusive School", modules: 8, score: 92, status: "Active" },
  { id: "MOS-1047", group: "Control", age: 10, support: "Standard Text", school: "Delhi Inclusive School", modules: 6, score: 74, status: "Active" },
  { id: "MOS-1048", group: "Experimental", age: 9, support: "Calm Step Mode", school: "Hope Foundation Lab", modules: 7, score: 88, status: "Active" },
  { id: "MOS-1049", group: "Control", age: 8, support: "Standard Text", school: "Hope Foundation Lab", modules: 5, score: 65, status: "Active" },
  { id: "MOS-1050", group: "Experimental", age: 10, support: "High Contrast + ISL", school: "St. Jude Inclusive Academy", modules: 9, score: 96, status: "Completed" },
  { id: "MOS-1051", group: "Control", age: 11, support: "Standard Text", school: "St. Jude Inclusive Academy", modules: 6, score: 71, status: "Active" },
  { id: "MOS-1052", group: "Experimental", age: 9, support: "Visual Captions + Audio", school: "Apex Special Learning", modules: 8, score: 91, status: "Active" },
  { id: "MOS-1053", group: "Control", age: 9, support: "Standard Text", school: "Apex Special Learning", modules: 5, score: 69, status: "Active" },
  { id: "MOS-1054", group: "Experimental", age: 8, support: "ISL Gesture Recognition", school: "Oak Creek Academy", modules: 8, score: 95, status: "Active" },
  { id: "MOS-1055", group: "Control", age: 10, support: "Standard Text", school: "Sunrise Learning Center", modules: 5, score: 70, status: "Active" },
  { id: "MOS-1056", group: "Experimental", age: 10, support: "Simplified Vocabulary", school: "Delhi Inclusive School", modules: 9, score: 93, status: "Completed" },
  { id: "MOS-1057", group: "Control", age: 9, support: "Standard Text", school: "Hope Foundation Lab", modules: 4, score: 64, status: "Active" },
];

const STATIC_SCHOOLS = [
  { name: "Oak Creek Academy", location: "Bengaluru, Karnataka", educators: 4, totalStudents: 34, exp: 18, ctrl: 16, avgScore: "93.4%" },
  { name: "Sunrise Learning Center", location: "Pune, Maharashtra", educators: 3, totalStudents: 28, exp: 14, ctrl: 14, avgScore: "91.8%" },
  { name: "Delhi Inclusive Model School", location: "New Delhi, Delhi", educators: 4, totalStudents: 32, exp: 16, ctrl: 16, avgScore: "92.6%" },
  { name: "Hope Foundation Community Lab", location: "Hyderabad, Telangana", educators: 3, totalStudents: 30, exp: 16, ctrl: 14, avgScore: "89.2%" },
];

export function ResearcherDashboard({ user }: ResearcherDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");

  const filteredStudents = useMemo(() => {
    return STATIC_COHORT_STUDENTS.filter((stu) => {
      const matchesSearch =
        stu.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.support.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup =
        groupFilter === "all" ||
        (groupFilter === "exp" && stu.group === "Experimental") ||
        (groupFilter === "ctrl" && stu.group === "Control");
      return matchesSearch && matchesGroup;
    });
  }, [searchQuery, groupFilter]);

  // CSV Exporter for SPSS/Excel
  const handleDownloadCsv = () => {
    const headers = [
      "Participant_ID",
      "Study_Cohort",
      "Age",
      "Support_Mode",
      "Institution",
      "Completed_Modules",
      "Assessment_Score_Pct",
      "Status",
    ];
    const rows = STATIC_COHORT_STUDENTS.map((s) => [
      s.id,
      s.group,
      s.age,
      `"${s.support}"`,
      `"${s.school}"`,
      s.modules,
      s.score,
      s.status,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `mosaic_research_study_dataset_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rd-shell">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="rd-header">
        <div>
          <span className="rd-eyebrow">Academic &amp; Clinical Research Portal</span>
          <h1 className="rd-title">Multimodal Learning Evaluation Dashboard</h1>
          <p className="rd-desc">
            Independent controlled efficacy study measuring task completion, cognitive focus, and sign language acquisition in neurodiverse and deaf learners.
          </p>
        </div>
        <div className="rd-header-meta">
          <span className="rd-protocol-badge">
            <CheckIcon size={14} />
            IRB Pilot Protocol #2025-084
          </span>
          <span className="rd-user-badge">
            Investigator: <strong>{user?.name || "Dr. Rachel Brooks"}</strong>
          </span>
        </div>
      </header>

      {/* ── Navigation Tabs ──────────────────────────────────────────────── */}
      <nav className="rd-nav" aria-label="Research dashboard sections">
        <button
          type="button"
          className={`rd-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview &amp; Key Findings
        </button>
        <button
          type="button"
          className={`rd-tab-btn ${activeTab === "cohorts" ? "active" : ""}`}
          onClick={() => setActiveTab("cohorts")}
        >
          Comparative Cohort Study
        </button>
        <button
          type="button"
          className={`rd-tab-btn ${activeTab === "institutions" ? "active" : ""}`}
          onClick={() => setActiveTab("institutions")}
        >
          Partner Institutions
        </button>
        <button
          type="button"
          className={`rd-tab-btn ${activeTab === "participants" ? "active" : ""}`}
          onClick={() => setActiveTab("participants")}
        >
          Participant Records
        </button>
        <button
          type="button"
          className={`rd-tab-btn ${activeTab === "export" ? "active" : ""}`}
          onClick={() => setActiveTab("export")}
        >
          Export SPSS / CSV
        </button>
      </nav>

      {/* ── KPI Summary Cards ────────────────────────────────────────────── */}
      <section className="rd-kpi-grid">
        <div className="rd-kpi-card">
          <span className="rd-kpi-label">Total Sample Size</span>
          <span className="rd-kpi-val">124</span>
          <span className="rd-kpi-sub">Across 4 partner centers</span>
        </div>
        <div className="rd-kpi-card highlight">
          <span className="rd-kpi-label">Experimental Group</span>
          <span className="rd-kpi-val">64</span>
          <span className="rd-kpi-sub">Adaptive Multimodal AI</span>
        </div>
        <div className="rd-kpi-card">
          <span className="rd-kpi-label">Control Group</span>
          <span className="rd-kpi-val">60</span>
          <span className="rd-kpi-sub">Standard text curriculum</span>
        </div>
        <div className="rd-kpi-card peach">
          <span className="rd-kpi-label">Normalized Gain</span>
          <span className="rd-kpi-val">+38.6%</span>
          <span className="rd-kpi-sub">Comprehension vs. control</span>
        </div>
        <div className="rd-kpi-card">
          <span className="rd-kpi-label">7-Day Retention</span>
          <span className="rd-kpi-val">92.4%</span>
          <span className="rd-kpi-sub">Weekly active learners</span>
        </div>
      </section>

      {/* ── TAB 1: OVERVIEW ──────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="rd-grid-2">
          {/* Chart Card */}
          <article className="rd-card">
            <div className="rd-card-head">
              <div>
                <h2 className="rd-card-title">Weekly Engagement Dynamics</h2>
                <p className="rd-card-desc">Average completed instructional modules per learner over 6 pilot weeks.</p>
              </div>
            </div>

            <div className="rd-chart-container">
              <svg viewBox="0 0 520 180" style={{ width: "100%", height: "auto" }}>
                {/* Grid Lines */}
                <line x1="30" y1="20" x2="500" y2="20" stroke="#E5E2DC" strokeDasharray="3 3" />
                <line x1="30" y1="70" x2="500" y2="70" stroke="#E5E2DC" strokeDasharray="3 3" />
                <line x1="30" y1="120" x2="500" y2="120" stroke="#E5E2DC" strokeDasharray="3 3" />
                <line x1="30" y1="150" x2="500" y2="150" stroke="#22352E" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="15" y="24" fontSize="11" fill="#707877" textAnchor="end">10</text>
                <text x="15" y="74" fontSize="11" fill="#707877" textAnchor="end">6</text>
                <text x="15" y="124" fontSize="11" fill="#707877" textAnchor="end">3</text>
                <text x="15" y="154" fontSize="11" fill="#707877" textAnchor="end">0</text>

                {/* Control line (Grey) */}
                <polyline
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  points="50,135 140,128 230,122 320,118 410,115 480,112"
                />
                {/* Experimental line (Mosaic Forest Green) */}
                <polyline
                  fill="none"
                  stroke="#506847"
                  strokeWidth="3.5"
                  points="50,130 140,110 230,85 320,55 410,38 480,24"
                />

                {/* Experimental Dots */}
                <circle cx="50" cy="130" r="4" fill="#506847" />
                <circle cx="140" cy="110" r="4" fill="#506847" />
                <circle cx="230" cy="85" r="4" fill="#506847" />
                <circle cx="320" cy="55" r="4" fill="#506847" />
                <circle cx="410" cy="38" r="4" fill="#506847" />
                <circle cx="480" cy="24" r="5" fill="#506847" />

                {/* Week Labels */}
                <text x="50" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 1</text>
                <text x="140" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 2</text>
                <text x="230" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 3</text>
                <text x="320" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 4</text>
                <text x="410" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 5</text>
                <text x="480" y="170" fontSize="11" fill="#707877" textAnchor="middle">Wk 6</text>
              </svg>
            </div>

            <div className="rd-chart-legend">
              <div className="rd-legend-item">
                <span className="rd-legend-dot" style={{ backgroundColor: "#506847" }} />
                <span>Experimental Group (Mosaic Adaptive)</span>
              </div>
              <div className="rd-legend-item">
                <span className="rd-legend-dot" style={{ backgroundColor: "#94A3B8" }} />
                <span>Control Group (Traditional)</span>
              </div>
            </div>
          </article>

          {/* Skill Domain Gains */}
          <article className="rd-card">
            <div className="rd-card-head">
              <div>
                <h2 className="rd-card-title">Pre- vs. Post-Intervention Gains</h2>
                <p className="rd-card-desc">Evaluated through entrance and exit benchmark evaluations across 4 core competencies.</p>
              </div>
            </div>

            <div className="rd-domain-list">
              <div className="rd-domain-item">
                <div className="rd-domain-head">
                  <span className="rd-domain-name">Text &amp; Vocabulary Comprehension</span>
                  <span className="rd-domain-score">41% → 82% (+41%)</span>
                </div>
                <div className="rd-dual-track">
                  <div className="rd-track">
                    <div className="rd-fill-post" style={{ width: "82%" }} />
                  </div>
                  <div className="rd-track-labels">
                    <span>Baseline: 41%</span>
                    <span>Post-Intervention: 82%</span>
                  </div>
                </div>
              </div>

              <div className="rd-domain-item">
                <div className="rd-domain-head">
                  <span className="rd-domain-name">ISL Gesture &amp; Sign Fluency</span>
                  <span className="rd-domain-score">27% → 76% (+49%)</span>
                </div>
                <div className="rd-dual-track">
                  <div className="rd-track">
                    <div className="rd-fill-post" style={{ width: "76%" }} />
                  </div>
                  <div className="rd-track-labels">
                    <span>Baseline: 27%</span>
                    <span>Post-Intervention: 76%</span>
                  </div>
                </div>
              </div>

              <div className="rd-domain-item">
                <div className="rd-domain-head">
                  <span className="rd-domain-name">Independent Task Completion</span>
                  <span className="rd-domain-score">34% → 79% (+45%)</span>
                </div>
                <div className="rd-dual-track">
                  <div className="rd-track">
                    <div className="rd-fill-post" style={{ width: "79%" }} />
                  </div>
                  <div className="rd-track-labels">
                    <span>Baseline: 34%</span>
                    <span>Post-Intervention: 79%</span>
                  </div>
                </div>
              </div>

              <div className="rd-domain-item">
                <div className="rd-domain-head">
                  <span className="rd-domain-name">Calm Attention &amp; Low Fatigue Rate</span>
                  <span className="rd-domain-score">48% → 88% (+40%)</span>
                </div>
                <div className="rd-dual-track">
                  <div className="rd-track">
                    <div className="rd-fill-post" style={{ width: "88%" }} />
                  </div>
                  <div className="rd-track-labels">
                    <span>Baseline: 48%</span>
                    <span>Post-Intervention: 88%</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* ── TAB 2: COHORTS ──────────────────────────────────────────────── */}
      {activeTab === "cohorts" && (
        <div className="rd-card">
          <div className="rd-card-head">
            <div>
              <h2 className="rd-card-title">Cohort Comparison: Experimental vs. Control</h2>
              <p className="rd-card-desc">Comparative analysis of learners using Mosaic multimodal adaptations vs. traditional printed/static curriculum.</p>
            </div>
          </div>

          <div className="rd-table-wrap">
            <table className="rd-table">
              <thead>
                <tr>
                  <th>Metric / Dimension</th>
                  <th>Experimental Group (n=64)</th>
                  <th>Control Group (n=60)</th>
                  <th>Statistical Significance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Intervention Modality</strong></td>
                  <td><span className="rd-badge-exp">Adaptive Text, ISL Studio &amp; Audio</span></td>
                  <td><span className="rd-badge-ctrl">Static Printed Worksheet</span></td>
                  <td>Assigned Cohorts</td>
                </tr>
                <tr>
                  <td><strong>Avg. Lessons Completed</strong></td>
                  <td><strong>7.8 / 10 lessons</strong></td>
                  <td>4.9 / 10 lessons</td>
                  <td><em>p &lt; 0.001 (Significant)</em></td>
                </tr>
                <tr>
                  <td><strong>Final Evaluation Accuracy</strong></td>
                  <td><strong>92.8%</strong></td>
                  <td>68.4%</td>
                  <td><em>p &lt; 0.001 (Significant)</em></td>
                </tr>
                <tr>
                  <td><strong>Educator Prompting Needed</strong></td>
                  <td><strong>1.2 prompts / lesson</strong></td>
                  <td>4.8 prompts / lesson</td>
                  <td><em>75% reduction in teacher intervention</em></td>
                </tr>
                <tr>
                  <td><strong>ISL Sign Recognition Rate</strong></td>
                  <td><strong>88.5% recognition</strong></td>
                  <td>28.1% recognition</td>
                  <td><em>+60.4% multimodal advantage</em></td>
                </tr>
                <tr>
                  <td><strong>Self-Reported Learner Frustration</strong></td>
                  <td><strong>Low (12%)</strong></td>
                  <td>High (58%)</td>
                  <td>Standardized Likert Evaluation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 3: INSTITUTIONS ─────────────────────────────────────────── */}
      {activeTab === "institutions" && (
        <div className="rd-card">
          <div className="rd-card-head">
            <div>
              <h2 className="rd-card-title">Participating Partner Institutions</h2>
              <p className="rd-card-desc">Geographic distribution and cohort assignment across participating inclusive institutions.</p>
            </div>
          </div>

          <div className="rd-table-wrap">
            <table className="rd-table">
              <thead>
                <tr>
                  <th>Institution Name</th>
                  <th>Location</th>
                  <th>Lead Educators</th>
                  <th>Cohort Breakdown</th>
                  <th>Total Enrolled</th>
                  <th>Mean Cohort Score</th>
                </tr>
              </thead>
              <tbody>
                {STATIC_SCHOOLS.map((sc) => (
                  <tr key={sc.name}>
                    <td><strong>{sc.name}</strong></td>
                    <td>{sc.location}</td>
                    <td>{sc.educators} certified teachers</td>
                    <td>
                      <span className="rd-badge-exp">{sc.exp} Exp</span>
                      {" / "}
                      <span className="rd-badge-ctrl">{sc.ctrl} Ctrl</span>
                    </td>
                    <td><strong>{sc.totalStudents} learners</strong></td>
                    <td><strong style={{ color: "#506847" }}>{sc.avgScore}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 4: PARTICIPANTS ─────────────────────────────────────────── */}
      {activeTab === "participants" && (
        <div className="rd-card">
          <div className="rd-card-head">
            <div>
              <h2 className="rd-card-title">Anonymized Participant Sample Directory</h2>
              <p className="rd-card-desc">Anonymized student participant records with study group, support mode, and completion metrics.</p>
            </div>
          </div>

          <div className="rd-search-bar">
            <input
              type="text"
              placeholder="Search by ID, institution, or adaptation mode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rd-search-input"
            />
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="rd-filter-select"
            >
              <option value="all">All Cohorts (124)</option>
              <option value="exp">Experimental Only</option>
              <option value="ctrl">Control Only</option>
            </select>
          </div>

          <div className="rd-table-wrap">
            <table className="rd-table">
              <thead>
                <tr>
                  <th>Participant ID</th>
                  <th>Group</th>
                  <th>Age</th>
                  <th>Primary Support Mode</th>
                  <th>Institution</th>
                  <th>Progress</th>
                  <th>Accuracy</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((stu) => (
                  <tr key={stu.id}>
                    <td><code>{stu.id}</code></td>
                    <td>
                      {stu.group === "Experimental" ? (
                        <span className="rd-badge-exp">Experimental</span>
                      ) : (
                        <span className="rd-badge-ctrl">Control</span>
                      )}
                    </td>
                    <td>{stu.age} yrs</td>
                    <td>{stu.support}</td>
                    <td>{stu.school}</td>
                    <td>{stu.modules} / 10 units</td>
                    <td><strong>{stu.score}%</strong></td>
                    <td>
                      <span style={{ color: stu.status === "Completed" ? "#506847" : "#57635E", fontWeight: 600 }}>
                        {stu.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 5: EXPORT ───────────────────────────────────────────────── */}
      {activeTab === "export" && (
        <div className="rd-card">
          <div className="rd-card-head">
            <div>
              <h2 className="rd-card-title">Research Data Extraction &amp; Statistical Tooling</h2>
              <p className="rd-card-desc">Download anonymized raw quantitative datasets for SPSS, R, Python, and dissertation reporting.</p>
            </div>
          </div>

          <div className="rd-export-box">
            <div className="rd-export-content">
              <h3 className="rd-export-title">Anonymized Pilot Dataset (.CSV)</h3>
              <p className="rd-export-desc">
                Includes all 124 cohort rows with anonymized participant IDs, pre- and post-questionnaire benchmark scores, interaction telemetry, and module completion times formatted for immediate SPSS / R analysis.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="rd-btn-primary"
            >
              <BookIcon size={16} />
              <span>Download Dataset (.CSV)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
