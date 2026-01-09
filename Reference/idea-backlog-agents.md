# Idea Backlog Management System

## Overview

Two agents for prioritizing and managing business ideas, plus a quick mode in business-discovery for intake.

## Source of Truth

- **Strategic HTML**: `Strategic Plan/Dec 2025/Deliverables/strategic-recommendations.html` (Section 11 - Product Backlog)
- **Working Backlog**: `Strategic Plan/Backlog/ideas-backlog.md`

The strategic HTML is the canonical source. The backlog.md is the working copy for day-to-day management. Keep them in sync.

## Workflow

```
business-discovery (QUICK MODE) → idea-prioritizer → backlog-manager → business-discovery (FULL MODE)
```

## File Locations

- Backlog: `Strategic Plan/Backlog/ideas-backlog.md`
- Rankings: `Strategic Plan/Backlog/priority-ranking.md`
- Archive: `Strategic Plan/Backlog/archived-ideas.md`
- Source: `Strategic Plan/Dec 2025/Deliverables/strategic-recommendations.html`

---

# Agent 1: Idea Prioritizer

## Purpose
Score and rank all evaluated ideas using Impact/Effort framework.

## When to Use
- User wants to prioritize the backlog
- User asks "what should I work on next?"
- After adding several new ideas

## Input
Read: `Strategic Plan/Backlog/ideas-backlog.md`

## Scoring Framework

For each idea with Status: Evaluated, calculate THREE dimensions:

### Impact Score (1-10)
- Revenue Potential (40%)
- Strategic Value (30%) - from viability assessment
- Competitive Advantage (30%)

### Effort Score (1-10)
- Resource Requirements (50%)
- Complexity (30%)
- Risk Level (20%)

### Financial Viability Score (1-10)
- **Time to Break-even (40%)**
  - 9-10: < 3 months
  - 7-8: 3-6 months
  - 5-6: 6-12 months
  - 3-4: 12-18 months
  - 1-2: 18+ months
- **Probable Revenue (30%)**
  - 9-10: $10K+/month potential
  - 7-8: $5-10K/month
  - 5-6: $1-5K/month
  - 3-4: $500-1K/month
  - 1-2: < $500/month
- **Revenue Confidence (30%)**
  - 9-10: Proven model (already generating revenue)
  - 7-8: Similar examples exist with data
  - 5-6: Reasonable assumptions
  - 3-4: Speculative
  - 1-2: Unproven/unknown

### Priority Score
`Priority = (Impact × 0.4) + ((10 - Effort) × 0.3) + (Financial Viability × 0.3)`

### Quadrant Assignment
- **Quick Wins**: Impact ≥ 7, Effort ≤ 4
- **Strategic Bets**: Impact ≥ 7, Effort > 4
- **Fill-ins**: Impact < 7, Effort ≤ 4
- **Avoid**: Impact < 7, Effort > 4

## Output

Update each idea with:
```markdown
### Priority Scoring
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Impact | [X] | 0.4 | [X × 0.4] |
| Effort (inverted) | [10-X] | 0.3 | [(10-X) × 0.3] |
| Financial Viability | [X] | 0.3 | [X × 0.3] |
| **Priority** | | | **[X.X]** |

### Financial Viability Breakdown
| Factor | Score | Notes |
|--------|-------|-------|
| Time to Break-even | [X] | [timeframe] |
| Probable Revenue | [X] | [$/month potential] |
| Revenue Confidence | [X] | [rationale] |
| **Avg Financial Score** | [X.X] | |

**Quadrant:** [Quick Win / Strategic Bet / Fill-in / Avoid]
**Status:** Scored
```

Create `Strategic Plan/Backlog/priority-ranking.md`:

```markdown
# Priority Ranking
*Last updated: [Date]*

## Quick Wins (Do First)
| Rank | Idea | Priority | Impact | Effort |
|------|------|----------|--------|--------|
| 1 | [Name] | [X.X] | [X] | [X] |

## Strategic Bets (Plan Carefully)
| Rank | Idea | Priority | Impact | Effort |
|------|------|----------|--------|--------|

## Fill-ins (When Time Permits)
| Rank | Idea | Priority | Impact | Effort |
|------|------|----------|--------|--------|

## Avoid (Deprioritize)
| Rank | Idea | Priority | Impact | Effort |
|------|------|----------|--------|--------|

## Recommended Next Actions
1. **Immediate**: [Top Quick Win] - Ready for full discovery
2. **Plan For**: [Top Strategic Bet] - Needs resource planning
```

---

# Agent 2: Backlog Manager

## Purpose
Maintain the backlog - update statuses, archive items, trigger full discovery when idea is selected. Keep backlog.md and strategic HTML in sync.

## When to Use
- User wants to see backlog status
- User selects an idea to pursue
- User wants to archive/delete/update an idea
- User adds a new idea (after quick mode evaluation)

## Sync Responsibility

When backlog changes:
1. Update `Strategic Plan/Backlog/ideas-backlog.md` (working copy)
2. Update `Strategic Plan/Dec 2025/Deliverables/strategic-recommendations.html` Section 11 (source of truth)

## Status Lifecycle

```
Evaluated → Scored → Selected → In Discovery → In Analysis → Decided → Archived
```

## Commands

| Command | Action |
|---------|--------|
| "Show backlog" | List all ideas by status with scores |
| "Select [idea]" | Mark Selected, launch business-discovery FULL MODE |
| "Archive [idea]" | Move to archived-ideas.md |
| "Delete [idea]" | Remove entirely |
| "Update [idea]" | Modify entry |

## When Idea is Selected

1. Update status to "Selected"
2. Display idea summary
3. Launch business-discovery in FULL MODE with context from the evaluation

## Output (Show Backlog)

```markdown
# Backlog Status
*As of [Date]*

## In Progress
| Idea | Status | Next Step |
|------|--------|-----------|

## Quick Wins (Ready)
| Idea | Priority | Recommendation |
|------|----------|----------------|

## Strategic Bets
| Idea | Priority | Key Risk |
|------|----------|----------|

## Parked
| Idea | Reason |
|------|--------|

---
**Total:** [X] ideas
**Top Pick:** [Name] - [Why]
```

---

# How It All Fits Together

```
1. User: "I have a new idea"
   → business-discovery QUICK MODE (3 phases)
   → Appends to ideas-backlog.md

2. User: "Prioritize my ideas"
   → idea-prioritizer
   → Scores and ranks all ideas

3. User: "Let's pursue [idea]"
   → backlog-manager updates status
   → Launches business-discovery FULL MODE

4. [Existing workflow]
   → strategic-analyzer → strategic-advisor
   → Full recommendations
```
