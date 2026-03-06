import { useState } from "react";

const LEVELS = [
  {
    name: "Beginner",
    range: [0, 3],
    color: "#7A8B69",
    bg: "#EDF2EA",
    border: "#C4D2B8",
    description: "First steps — getting familiar with what Claude can do",
  },
  {
    name: "Explorer",
    range: [4, 8],
    color: "#5A8FA8",
    bg: "#E4EFF5",
    border: "#A8CDE0",
    description: "Curious and experimenting — trying features and building habits",
  },
  {
    name: "Practitioner",
    range: [9, 15],
    color: "#8B6BAE",
    bg: "#EDE4F5",
    border: "#C5AFDB",
    description: "Claude is part of the daily toolkit — confident and consistent use",
  },
  {
    name: "Expert",
    range: [16, 23],
    color: "#B8752C",
    bg: "#F8EDDF",
    border: "#E2BC8E",
    description: "Deep fluency — shaping how Claude works, not just using it",
  },
  {
    name: "Champion",
    range: [24, 40],
    color: "#C43B3B",
    bg: "#FCEAEA",
    border: "#E8A8A8",
    description: "Building team infrastructure — making everyone else better with AI",
  },
];

const MILESTONES = [
  // Beginner
  { id: 1, text: "Asked Claude a question and used the answer in their work", tier: 0, points: 1, category: "Basics" },
  { id: 2, text: "Used Claude to draft or revise written content (email, doc, message)", tier: 0, points: 1, category: "Basics" },
  { id: 3, text: "Uploaded a file or image for Claude to analyse or work with", tier: 0, points: 1, category: "Basics" },
  { id: 4, text: "Iterated on a response — gave feedback, asked follow-ups, or corrected Claude", tier: 0, points: 1, category: "Basics" },

  // Explorer
  { id: 5, text: "Used Claude to summarise or extract key points from a long document", tier: 1, points: 1, category: "Workflow" },
  { id: 6, text: "Wrote a structured prompt with explicit context, constraints, or examples", tier: 1, points: 1, category: "Prompting" },
  { id: 7, text: "Used Claude to prepare for a meeting, presentation, or decision", tier: 1, points: 1, category: "Workflow" },
  { id: 8, text: "Connected and actively used an integration (Slack, Drive, Gmail, Calendar)", tier: 1, points: 1, category: "Integrations" },
  { id: 9, text: "Used web search or deep research mode to gather current information", tier: 1, points: 1, category: "Workflow" },

  // Practitioner
  { id: 10, text: "Uses Claude as part of their daily workflow — not just occasionally", tier: 2, points: 1, category: "Workflow" },
  { id: 11, text: "Used built-in skills to create a document, spreadsheet, or presentation", tier: 2, points: 1, category: "Skills" },
  { id: 12, text: "Built an interactive artifact or small app with Claude", tier: 2, points: 2, category: "Building" },
  { id: 13, text: "Set up a Project with custom instructions to tailor Claude for a recurring task", tier: 2, points: 1, category: "Customisation" },
  { id: 14, text: "Used Claude to analyse data and produce charts, dashboards, or visual outputs", tier: 2, points: 1, category: "Building" },
  { id: 15, text: "Completed a multi-step workflow across tools (e.g. research → doc → email)", tier: 2, points: 2, category: "Workflow" },

  // Expert
  { id: 16, text: "Modified system instructions or custom context to meaningfully change Claude's behaviour", tier: 3, points: 2, category: "Customisation" },
  { id: 17, text: "Used the Anthropic API directly (via SDK, curl, or Claude Code)", tier: 3, points: 2, category: "Technical" },
  { id: 18, text: "Built a multi-file application or tool with Claude's assistance", tier: 3, points: 2, category: "Building" },
  { id: 19, text: "Used MCP (Model Context Protocol) servers to connect Claude to external services", tier: 3, points: 2, category: "Technical" },
  { id: 20, text: "Debugged a failing interaction by adjusting prompts, context, or architecture", tier: 3, points: 1, category: "Prompting" },
  { id: 21, text: "Identified and implemented a use case that saved measurable time", tier: 3, points: 1, category: "Impact" },

  // Champion
  { id: 22, text: "Written and published a custom skill for the team to use in Claude", tier: 4, points: 3, category: "Infrastructure" },
  { id: 23, text: "Deployed a Claude-powered tool or app to Vercel for team or external access", tier: 4, points: 3, category: "Infrastructure" },
  { id: 24, text: "Created or modified the team onboarding process to include AI adoption training", tier: 4, points: 2, category: "Leadership" },
  { id: 25, text: "Built and maintained a shared prompt library or template repository for the org", tier: 4, points: 2, category: "Leadership" },
  { id: 26, text: "Set up a CI/CD pipeline incorporating Claude (e.g. Claude Code in GitHub Actions)", tier: 4, points: 3, category: "Infrastructure" },
  { id: 27, text: "Ran a workshop, lunch-and-learn, or training session on Claude for colleagues", tier: 4, points: 2, category: "Leadership" },
  { id: 28, text: "Configured and managed MCP servers or integrations at the organisation level", tier: 4, points: 3, category: "Infrastructure" },
  { id: 29, text: "Measured and reported on AI adoption metrics or ROI for their team", tier: 4, points: 2, category: "Impact" },
  { id: 30, text: "Contributed to an internal SDK, wrapper, or abstraction layer over the Anthropic API", tier: 4, points: 3, category: "Infrastructure" },
];

const CATEGORIES = ["All", "Basics", "Workflow", "Prompting", "Integrations", "Skills", "Building", "Customisation", "Technical", "Infrastructure", "Leadership", "Impact"];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 0L7.8 4.2L12 4.6L8.8 7.4L9.8 12L6 9.6L2.2 12L3.2 7.4L0 4.6L4.2 4.2Z"/>
  </svg>
);

export default function AIAdoptionScorecard() {
  const [checked, setChecked] = useState({});
  const [filterCat, setFilterCat] = useState("All");
  const [viewMode, setViewMode] = useState("scorecard");

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalPoints = MILESTONES.reduce(
    (sum, m) => sum + (checked[m.id] ? m.points : 0), 0
  );
  const maxPoints = MILESTONES.reduce((sum, m) => sum + m.points, 0);
  const completedCount = MILESTONES.filter((m) => checked[m.id]).length;

  const currentLevel =
    [...LEVELS].reverse().find((l) => totalPoints >= l.range[0]) || LEVELS[0];

  const tierCounts = [0, 1, 2, 3, 4].map((t) => {
    const done = MILESTONES.filter((m) => m.tier === t && checked[m.id]).length;
    const total = MILESTONES.filter((m) => m.tier === t).length;
    return { done, total, label: `${done}/${total}` };
  });

  const filtered =
    filterCat === "All"
      ? MILESTONES
      : MILESTONES.filter((m) => m.category === filterCat);

  return (
    <div style={{
      fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif",
      background: "#FAFAF8",
      minHeight: "100vh",
      color: "#2C2C2C",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pill { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 600; letter-spacing: 0.4px; text-transform: uppercase; }
        .cat-btn { padding: 4px 12px; border-radius: 20px; border: 1.5px solid #DDD; background: white; font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: inherit; color: #555; }
        .cat-btn:hover { border-color: #999; }
        .cat-btn.active { background: #2C2C2C; color: white; border-color: #2C2C2C; }
        .milestone-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; border-radius: 10px; cursor: pointer; transition: all 0.15s; border: 1.5px solid transparent; }
        .milestone-row:hover { background: white; border-color: #E8E8E4; }
        .milestone-row.done { background: white; border-color: #E8E8E4; }
        .checkbox { width: 20px; height: 20px; min-width: 20px; border-radius: 6px; border: 2px solid #CCC; display: flex; align-items: center; justify-content: center; transition: all 0.15s; margin-top: 1px; }
        .checkbox.checked { border-color: transparent; color: white; }
        .tab-btn { padding: 7px 18px; border: none; background: none; font-size: 12.5px; font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; color: #999; transition: all 0.15s; font-family: inherit; }
        .tab-btn.active { color: #2C2C2C; border-bottom-color: #2C2C2C; }
        .level-bar-segment { height: 5px; transition: all 0.3s ease; border-radius: 2px; }
        .summary-card { flex: 1; padding: 18px; border-radius: 12px; border: 1.5px solid #E8E8E4; background: white; min-width: 200px; }
        .level-guide-card { background: white; border-radius: 12px; padding: 22px; border: 1.5px solid #E8E8E4; border-left: 4px solid; }
        .level-guide-milestone { display: flex; align-items: center; gap: 8px; padding: 5px 0; font-size: 12.5px; color: #555; border-bottom: 1px solid #F5F5F2; }
        .pts-badge { font-size: 9px; font-family: 'DM Mono', monospace; color: #BBB; background: #F5F5F2; padding: 1px 6px; border-radius: 4px; white-space: nowrap; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "28px 28px 0", maxWidth: 920, margin: "0 auto" }}>
        <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#AAA", letterSpacing: 1.2, textTransform: "uppercase" }}>AI Adoption Framework</span>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginTop: 4, marginBottom: 5, lineHeight: 1.2 }}>
          Claude Proficiency Scorecard
        </h1>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.5, maxWidth: 620 }}>
          Track milestones across five proficiency levels. Check off achievements to measure fluency — from first prompt to building team infrastructure.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ padding: "20px 28px", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
          <div className="summary-card">
            <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#AAA", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Current Level</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: currentLevel.color, lineHeight: 1 }}>{currentLevel.name}</span>
              <span style={{ fontSize: 13, color: "#AAA", fontWeight: 500 }}>{totalPoints} / {maxPoints} pts</span>
            </div>
            <p style={{ fontSize: 11.5, color: "#999", marginTop: 5, lineHeight: 1.4 }}>{currentLevel.description}</p>
          </div>

          <div className="summary-card">
            <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#AAA", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Milestones</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              {completedCount} of {MILESTONES.length} completed
            </div>
            <div style={{ display: "flex", gap: 2, borderRadius: 4, overflow: "hidden", background: "#F0F0EC", height: 5, marginBottom: 10 }}>
              {LEVELS.map((level, i) => {
                const tierMs = MILESTONES.filter((m) => m.tier === i);
                const tierTotal = tierMs.reduce((s, m) => s + m.points, 0);
                const tierEarned = tierMs.filter((m) => checked[m.id]).reduce((s, m) => s + m.points, 0);
                const pct = tierTotal > 0 ? (tierEarned / tierTotal) * 100 : 0;
                return (
                  <div key={i} style={{ flex: tierTotal, position: "relative" }}>
                    <div className="level-bar-segment" style={{ width: `${pct}%`, background: level.color }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {LEVELS.map((l, i) => (
                <span key={i} style={{ fontSize: 10, color: l.color, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: l.color, display: "inline-block" }} />
                  {l.name} {tierCounts[i].label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1.5px solid #E8E8E4", marginBottom: 14 }}>
          <button className={`tab-btn ${viewMode === "scorecard" ? "active" : ""}`} onClick={() => setViewMode("scorecard")}>Milestones</button>
          <button className={`tab-btn ${viewMode === "levels" ? "active" : ""}`} onClick={() => setViewMode("levels")}>Level Guide</button>
        </div>

        {/* SCORECARD VIEW */}
        {viewMode === "scorecard" && (
          <>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`cat-btn ${filterCat === cat ? "active" : ""}`} onClick={() => setFilterCat(cat)}>{cat}</button>
              ))}
            </div>

            {LEVELS.map((level, tierIdx) => {
              const tierItems = filtered.filter((m) => m.tier === tierIdx);
              if (tierItems.length === 0) return null;
              return (
                <div key={tierIdx} style={{ marginBottom: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, paddingLeft: 4 }}>
                    <span className="pill" style={{ background: level.bg, color: level.color, border: `1px solid ${level.border}` }}>
                      {level.name}
                    </span>
                    <span style={{ fontSize: 10, color: "#CCC", fontFamily: "'DM Mono', monospace" }}>
                      {level.range[0]}–{level.range[1]} pts
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {tierItems.map((m) => (
                      <div key={m.id} className={`milestone-row ${checked[m.id] ? "done" : ""}`} onClick={() => toggle(m.id)}>
                        <div className={`checkbox ${checked[m.id] ? "checked" : ""}`} style={checked[m.id] ? { background: level.color } : {}}>
                          {checked[m.id] && <CheckIcon />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 500,
                            lineHeight: 1.4,
                            color: checked[m.id] ? "#AAA" : "#2C2C2C",
                            textDecoration: checked[m.id] ? "line-through" : "none",
                          }}>
                            {m.text}
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center" }}>
                            <span className="pts-badge">{m.category}</span>
                            <span style={{ fontSize: 9, color: "#CCC", display: "flex", alignItems: "center", gap: 2 }}>
                              {Array.from({ length: m.points }).map((_, i) => <StarIcon key={i} />)}
                              <span style={{ marginLeft: 2 }}>{m.points} pt{m.points > 1 ? "s" : ""}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* LEVEL GUIDE VIEW */}
        {viewMode === "levels" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {LEVELS.map((level, i) => {
              const tierMilestones = MILESTONES.filter((m) => m.tier === i);
              const tierMaxPts = tierMilestones.reduce((s, m) => s + m.points, 0);
              return (
                <div key={i} className="level-guide-card" style={{ borderColor: level.border, borderLeftColor: level.color }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: level.color }}>{level.name}</h3>
                    <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#BBB" }}>
                      {level.range[0]}–{level.range[1]} pts to reach
                    </span>
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#CCC", marginLeft: "auto" }}>
                      {tierMilestones.length} milestones · {tierMaxPts} pts available
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>{level.description}</p>
                  {tierMilestones.map((m) => (
                    <div key={m.id} className="level-guide-milestone">
                      <span style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 30, color: level.color }}>
                        {Array.from({ length: m.points }).map((_, j) => <StarIcon key={j} />)}
                      </span>
                      <span style={{ flex: 1 }}>{m.text}</span>
                      <span className="pts-badge">{m.category}</span>
                    </div>
                  ))}
                </div>
              );
            })}

            <div style={{
              background: "#F8F8F5",
              borderRadius: 10,
              padding: 18,
              fontSize: 11.5,
              color: "#888",
              lineHeight: 1.6,
            }}>
              <strong style={{ color: "#555" }}>How scoring works:</strong> Milestones carry 1–3 points based on complexity. Foundational tasks (1 pt) build habits; intermediate tasks (2 pts) show deeper integration; infrastructure tasks (3 pts) reflect team-level impact. Total possible: {maxPoints} points across {MILESTONES.length} milestones. Most employees should reach Practitioner within 4–6 weeks of regular use. Expert and Champion tiers are stretch goals that indicate genuine technical fluency and organisational leadership.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
