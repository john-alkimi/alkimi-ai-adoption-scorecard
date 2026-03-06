# Alkimi AI Adoption Scorecard

A gamified framework for tracking employee AI fluency at Alkimi. Each team member gets a personal scorecard to log milestones, earn points, and progress through five proficiency levels — from **Beginner** to **Champion**.

## How It Works

Employees check off milestones as they build AI skills with Claude. Each milestone carries 1–3 points based on complexity, and points map to proficiency levels:

| Level | Points | Description |
|-------|--------|-------------|
| Beginner | 0–3 | First steps — getting familiar with what Claude can do |
| Explorer | 4–8 | Curious and experimenting — trying features and building habits |
| Practitioner | 9–15 | Claude is part of the daily toolkit — confident and consistent use |
| Expert | 16–23 | Deep fluency — shaping how Claude works, not just using it |
| Champion | 24–40 | Building team infrastructure — making everyone else better with AI |

30 milestones across 12 categories (Basics, Workflow, Prompting, Integrations, Skills, Building, Customisation, Technical, Infrastructure, Leadership, Impact).

## Roadmap

- **Per-employee scorecards** — individual tracking with persistent state
- **Automated milestone detection** — integrate with Claude Admin and OpenTelemetry to automatically log completed tasks based on real usage data
- **Team dashboards** — aggregate views of AI adoption across the organisation
- **Reporting** — exportable adoption metrics and ROI insights

## Getting Started

The scorecard is a standalone React component (`AIAdoptionScorecard.jsx`). Drop it into any React project:

```jsx
import AIAdoptionScorecard from "./AIAdoptionScorecard";

function App() {
  return <AIAdoptionScorecard />;
}
```

Requires React 18+.
