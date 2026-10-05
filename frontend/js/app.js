/**
 * Kairo Application Controller (Phases 1 & 2)
 * Handles Profile Views, Kaggle Footprint, Knowledge Graph Canvas, JD Analysis, Project Ranking, Tailored Resume & Growth Velocity.
 */

// Global State
let currentProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
let currentJDList = [...SAMPLE_JDS];
let selectedJD = currentJDList[0];
let currentMatchResult = null;
let currentTailoredResume = null;
let currentEvaluation = null;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderProfileView();
  renderKnowledgeGraph();
  populateJDOpts();
  triggerAutoAnalysis();
  setupEventListeners();
});

// Tab Navigation
function setupNavigation() {
  const navBtns = document.querySelectorAll(".nav-item-btn, .nav-btn");
  const tabTitles = {
    "tab-profile": "Executive Career Intelligence",
    "tab-devintel": "Developer Intelligence & Technical Rigor",
    "tab-graph": "Career Knowledge Graph Topology",
    "tab-matcher": "Opportunity Matcher & Ranking",
    "tab-resume": "Tailored Resume Studio",
    "tab-diagnostics": "Dimensional ATS Readiness Audit",
    "tab-growth": "Growth Velocity & Strategic Roadmap"
  };

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-view").forEach(view => view.classList.remove("active"));
      const activeView = document.getElementById(targetTab);
      if (activeView) activeView.classList.add("active");

      // Update top bar title
      const titleEl = document.getElementById("view-title");
      if (titleEl && tabTitles[targetTab]) {
        titleEl.textContent = tabTitles[targetTab];
      }

      if (targetTab === "tab-graph") {
        renderKnowledgeGraph();
      }
    });
  });
}

// 1. Profile Hub Renderer
function renderProfileView() {
  document.getElementById("profile-summary").textContent = currentProfile.summary;

  // Render Skills
  const skillsContainer = document.getElementById("profile-skills-list");
  skillsContainer.innerHTML = "";
  currentProfile.skills.forEach(skill => {
    const pill = document.createElement("div");
    pill.className = "skill-pill";
    const badgeClass = `badge-clay-${skill.evidence_status.toLowerCase()}`;
    pill.innerHTML = `
      <strong>${skill.name}</strong>
      <span class="badge-clay ${badgeClass}">${skill.evidence_status}</span>
    `;
    skillsContainer.appendChild(pill);
  });

  // Render Projects
  const projectsContainer = document.getElementById("profile-projects-list");
  projectsContainer.innerHTML = "";
  currentProfile.projects.forEach(p => {
    const pCard = document.createElement("div");
    pCard.className = "project-rank-item";
    const badgeClass = `badge-clay-${p.evidence_status.toLowerCase()}`;
    pCard.innerHTML = `
      <div class="project-rank-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <h4 style="font-family:var(--font-display); font-size:1.05rem; font-weight:700;">${p.title}</h4>
        <span class="badge-clay ${badgeClass}">${p.evidence_status}</span>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.6rem;">${p.summary}</p>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        ${p.skills_used.map(s => `<span class="badge-clay" style="background: rgba(255,255,255,0.04); color:#9ca3af;">${s}</span>`).join('')}
      </div>
    `;
    projectsContainer.appendChild(pCard);
  });
}

// 2. Interactive Career Knowledge Graph (Phase 2)
function renderKnowledgeGraph() {
  const container = document.getElementById("graph-canvas");
  if (!container) return;
  container.innerHTML = "";

  const graphNodes = [
    { label: "Alex Chen [CANDIDATE]", type: "person", top: "45%", left: "40%" },
    { label: "Python", type: "skill", top: "25%", left: "28%" },
    { label: "PyTorch", type: "skill", top: "15%", left: "48%" },
    { label: "RAG & Agents", type: "skill", top: "22%", left: "68%" },
    { label: "PostgreSQL / pgvector", type: "skill", top: "68%", left: "28%" },
    { label: "TypeScript / Next.js", type: "skill", top: "72%", left: "55%" },
    { label: "LightGBM & GNNs", type: "skill", top: "40%", left: "10%" },
    
    { label: "RAG Research Assistant", type: "project", top: "18%", left: "80%" },
    { label: "Real-Time Fraud Engine", type: "project", top: "58%", left: "8%" },
    { label: "Modern Dev Portfolio", type: "project", top: "82%", left: "68%" },

    { label: "github.com/rag-assistant", type: "evidence", top: "35%", left: "82%" },
    { label: "Kaggle Master (Rank #412)", type: "evidence", top: "75%", left: "10%" }
  ];

  graphNodes.forEach((n) => {
    const bubble = document.createElement("div");
    bubble.className = `graph-node-bubble node-${n.type}`;
    bubble.style.top = n.top;
    bubble.style.left = n.left;
    bubble.innerHTML = `${n.label}`;
    
    bubble.title = `${n.type.toUpperCase()}: ${n.label}`;
    bubble.addEventListener("click", () => {
      bubble.style.borderColor = "var(--accent-gold)";
      setTimeout(() => bubble.style.borderColor = "", 1200);
    });

    container.appendChild(bubble);
  });
}

// 3. Job Selection & Matching
function populateJDOpts() {
  const select = document.getElementById("preset-jd-select");
  select.innerHTML = currentJDList.map((jd, idx) => `<option value="${idx}">${jd.company} — ${jd.title}</option>`).join('');
  select.addEventListener("change", (e) => {
    selectedJD = currentJDList[parseInt(e.target.value, 10)];
    document.getElementById("jd-title-input").value = selectedJD.title;
    document.getElementById("jd-company-input").value = selectedJD.company;
    document.getElementById("jd-text-input").value = selectedJD.raw_text;
    triggerAutoAnalysis();
  });

  document.getElementById("jd-title-input").value = selectedJD.title;
  document.getElementById("jd-company-input").value = selectedJD.company;
  document.getElementById("jd-text-input").value = selectedJD.raw_text;
}

// Trigger match & ranking calculation
function triggerAutoAnalysis() {
  const title = document.getElementById("jd-title-input").value;
  const company = document.getElementById("jd-company-input").value;
  const rawText = document.getElementById("jd-text-input").value;

  const targetKeywords = ["Python", "FastAPI", "PyTorch", "RAG", "pgvector", "PostgreSQL", "Docker", "TypeScript", "React", "Next.js", "AWS", "System Design", "LightGBM", "Vector Search"];
  const detectedKeywords = targetKeywords.filter(kw => rawText.toLowerCase().includes(kw.toLowerCase()));

  const profileSkillsMap = new Map(currentProfile.skills.map(s => [s.name.toLowerCase(), s]));
  const strongMatches = [];
  const partialMatches = [];
  const skillGaps = [];

  detectedKeywords.forEach(kw => {
    if (profileSkillsMap.has(kw.toLowerCase())) {
      const s = profileSkillsMap.get(kw.toLowerCase());
      if (s.evidence_status === "VERIFIED") strongMatches.push(kw);
      else partialMatches.push(kw);
    } else {
      skillGaps.push(kw);
    }
  });

  // Rank candidate projects
  const rankedProjects = currentProfile.projects.map(proj => {
    const matched = proj.skills_used.filter(s => detectedKeywords.map(k => k.toLowerCase()).includes(s.toLowerCase()));
    let score = Math.min(99, Math.round(50 + (matched.length * 15) + (proj.evidence_status === "VERIFIED" ? 15 : 5)));
    return {
      id: proj.id,
      title: proj.title,
      score: score,
      matched_skills: matched,
      bullets: proj.bullets,
      evidence_status: proj.evidence_status,
      rationale: `Directly matches ${matched.length} core technical requirements with authenticated repository & Kaggle telemetry.`
    };
  }).sort((a, b) => b.score - a.score);

  currentMatchResult = {
    overall_match_score: Math.min(96, Math.round(72 + (strongMatches.length * 4))),
    evidence_confidence_score: 98,
    strong_matches: strongMatches,
    partial_matches: partialMatches,
    skill_gaps: skillGaps,
    ranked_projects: rankedProjects
  };

  renderMatchResults();
  buildTailoredResume();
}

function renderMatchResults() {
  document.getElementById("overall-match-score").textContent = `${currentMatchResult.overall_match_score}%`;
  document.getElementById("evidence-confidence-score").textContent = `${currentMatchResult.evidence_confidence_score}%`;

  // Render Skill Matches Breakdown
  const strongEl = document.getElementById("strong-matches-container");
  strongEl.innerHTML = currentMatchResult.strong_matches.map(s => `
    <span class="skill-pill"><span class="badge-clay badge-clay-verified">VERIFIED</span> ${s}</span>
  `).join('') || '<span style="color:var(--text-muted)">None</span>';

  const partialEl = document.getElementById("partial-matches-container");
  partialEl.innerHTML = currentMatchResult.partial_matches.map(s => `
    <span class="skill-pill"><span class="badge-clay badge-clay-supported">SUPPORTED</span> ${s}</span>
  `).join('') || '<span style="color:var(--text-muted)">None</span>';

  const gapEl = document.getElementById("skill-gaps-container");
  gapEl.innerHTML = currentMatchResult.skill_gaps.map(s => `
    <span class="skill-pill"><span class="badge-clay badge-clay-gap">GAP</span> ${s}</span>
  `).join('') || '<span style="color:var(--text-muted)">No critical gaps</span>';

  // Render Ranked Projects List
  const rankListEl = document.getElementById("ranked-projects-list");
  rankListEl.innerHTML = "";
  currentMatchResult.ranked_projects.forEach((rp, idx) => {
    const item = document.createElement("div");
    item.className = "project-rank-item";
    item.innerHTML = `
      <div class="project-rank-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <div>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color: var(--accent-gold); margin-right: 0.5rem;">[RANK ${idx+1}]</span>
          <strong style="font-family:var(--font-display); font-size: 1.05rem;">${rp.title}</strong>
        </div>
        <div class="score-chip-3d">${rp.score}</div>
      </div>
      <p style="font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${rp.rationale}</p>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        ${rp.matched_skills.map(s => `<span class="badge-clay badge-clay-verified">${s}</span>`).join('')}
      </div>
    `;
    rankListEl.appendChild(item);
  });
}

// 4. Tailored Resume Generation
function buildTailoredResume() {
  const isOnePage = document.getElementById("constraint-one-page").checked;
  const excludeCodeforces = document.getElementById("constraint-exclude-cp").checked;
  const focusMl = document.getElementById("constraint-focus-ml").checked;
  const mustIncludeRag = document.getElementById("constraint-must-rag").checked;

  const title = document.getElementById("jd-title-input").value;
  const company = document.getElementById("jd-company-input").value;

  let selected = [...currentMatchResult.ranked_projects];
  if (mustIncludeRag) {
    const ragProj = selected.find(p => p.title.includes("RAG"));
    if (ragProj) {
      selected = [ragProj, ...selected.filter(p => !p.title.includes("RAG"))];
    }
  }

  const projectCount = isOnePage ? 2 : 3;
  const finalProjects = selected.slice(0, projectCount);

  currentTailoredResume = {
    name: currentProfile.full_name,
    headline: `${currentProfile.headline} | ${title} Candidate${focusMl ? " (Specializing in Machine Learning & AI Systems)" : ""}`,
    contact: `${currentProfile.email} • ${currentProfile.phone} • ${currentProfile.location} • ${currentProfile.github_username}`,
    summary: `Results-oriented AI Engineer with verified, evidence-backed experience in ${currentMatchResult.strong_matches.slice(0, 3).join(', ')}. Demonstrated capability architecting scalable high-throughput AI microservices aligned with ${company}'s technical requirements.`,
    skills: {
      "Programming Languages": ["Python", "TypeScript", "SQL"],
      "Frameworks & AI/ML": ["FastAPI", "PyTorch", "RAG", "pgvector", "LightGBM", "Next.js"],
      "Tools & Infrastructure": ["Docker", "Git", "PostgreSQL", "REST APIs"]
    },
    projects: finalProjects,
    experience: currentProfile.experience,
    education: currentProfile.education
  };

  renderResumePaper();
  renderDiagnostics();
}

function renderResumePaper() {
  const res = currentTailoredResume;
  const container = document.getElementById("resume-paper-content");
  
  container.innerHTML = `
    <div class="resume-header">
      <div class="resume-name">${res.name}</div>
      <div style="font-weight:600; font-family:var(--font-mono); font-size: 0.85rem; color: #4b5563; margin-top:2px;">${res.headline}</div>
      <div class="resume-contact">${res.contact}</div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">Executive Summary</div>
      <p style="font-size: 0.86rem; color: #1f2937;">${res.summary}</p>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">Technical Competencies</div>
      <div style="font-size: 0.84rem; color: #1f2937;">
        ${Object.entries(res.skills).map(([cat, sks]) => `<div><strong>${cat}:</strong> ${sks.join(', ')}</div>`).join('')}
      </div>
    </div>

    <div class="resume-section">
      <div class="resume-section-title">Featured Projects (Evidence-Ranked)</div>
      ${res.projects.map(p => `
        <div class="resume-item">
          <div class="resume-item-header">
            <span>${p.title}</span>
            <span style="font-size:0.75rem; font-family:var(--font-mono); color:#6b7280; font-weight:normal;">[Score: ${p.score}/100 • Grounded]</span>
          </div>
          <ul class="resume-bullets">
            ${p.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <div class="resume-section">
      <div class="resume-section-title">Professional Experience</div>
      ${res.experience.map(e => `
        <div class="resume-item">
          <div class="resume-item-header">
            <span>${e.role} — <strong>${e.company}</strong></span>
            <span style="font-size:0.8rem; color:#6b7280;">${e.start_date} – ${e.end_date}</span>
          </div>
          <ul class="resume-bullets">
            ${e.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>

    <div class="resume-section">
      <div class="resume-section-title">Education & Credentials</div>
      ${res.education.map(edu => `
        <div class="resume-item">
          <div class="resume-item-header">
            <span>${edu.degree} in ${edu.field_of_study} — <strong>${edu.institution}</strong></span>
            <span style="font-size:0.8rem; color:#6b7280;">Class of ${edu.grad_year} (GPA: ${edu.gpa})</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. ATS Diagnostics
function renderDiagnostics() {
  const scores = {
    jd_alignment: 93,
    keyword_coverage: 90,
    experience_relevance: 94,
    project_relevance: 96,
    evidence_confidence: 98,
    structure_quality: 99
  };

  document.getElementById("diag-alignment-val").textContent = `${scores.jd_alignment}%`;
  document.getElementById("diag-alignment-bar").style.width = `${scores.jd_alignment}%`;

  document.getElementById("diag-keyword-val").textContent = `${scores.keyword_coverage}%`;
  document.getElementById("diag-keyword-bar").style.width = `${scores.keyword_coverage}%`;

  document.getElementById("diag-experience-val").textContent = `${scores.experience_relevance}%`;
  document.getElementById("diag-experience-bar").style.width = `${scores.experience_relevance}%`;

  document.getElementById("diag-project-val").textContent = `${scores.project_relevance}%`;
  document.getElementById("diag-project-bar").style.width = `${scores.project_relevance}%`;

  document.getElementById("diag-evidence-val").textContent = `${scores.evidence_confidence}%`;
  document.getElementById("diag-evidence-bar").style.width = `${scores.evidence_confidence}%`;

  document.getElementById("diag-structure-val").textContent = `${scores.structure_quality}%`;
  document.getElementById("diag-structure-bar").style.width = `${scores.structure_quality}%`;
}

// Event Listeners
function setupEventListeners() {
  document.getElementById("btn-analyze-jd").addEventListener("click", () => {
    triggerAutoAnalysis();
  });

  document.getElementById("constraint-one-page").addEventListener("change", buildTailoredResume);
  document.getElementById("constraint-exclude-cp").addEventListener("change", buildTailoredResume);
  document.getElementById("constraint-focus-ml").addEventListener("change", buildTailoredResume);
  document.getElementById("constraint-must-rag").addEventListener("change", buildTailoredResume);

  // Sync GitHub Mock
  document.getElementById("btn-sync-github").addEventListener("click", () => {
    const btn = document.getElementById("btn-sync-github");
    btn.textContent = "Verifying...";
    setTimeout(() => {
      btn.textContent = "Verified (3 Repos)";
      btn.style.color = "#86efac";
    }, 500);
  });

  // Sync Kaggle (Phase 2)
  document.getElementById("btn-sync-kaggle").addEventListener("click", () => {
    const btn = document.getElementById("btn-sync-kaggle");
    btn.textContent = "Verifying...";
    setTimeout(() => {
      btn.textContent = "Verified (34 Notebooks)";
      btn.style.color = "var(--accent-gold-light)";
    }, 500);
  });

  // Sidebar Collapse / Expand Toggle
  const toggleBtn = document.getElementById("btn-toggle-sidebar");
  const layout = document.getElementById("app-layout");
  const toggleIcon = document.getElementById("toggle-icon");
  if (toggleBtn && layout) {
    toggleBtn.addEventListener("click", () => {
      layout.classList.toggle("sidebar-collapsed");
      const isCollapsed = layout.classList.contains("sidebar-collapsed");
      if (toggleIcon) {
        toggleIcon.textContent = isCollapsed ? "▶" : "◀";
      }
    });
  }

  // Export Resume Action
  document.getElementById("btn-export-resume").addEventListener("click", () => {
    window.print();
  });
}
