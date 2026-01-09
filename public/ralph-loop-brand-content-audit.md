# Brand & Content Alignment Audit - Ralph Loop Prompt

## COMMAND TO RUN
```bash
/ralph-loop ralph-loop-brand-content-audit.md --max-iterations 75 --completion-promise "BRAND_AUDIT_COMPLETE"
```

---

## MISSION
Compare the BRAND-REFRESH-MANIFESTO.md against ALL Brand Strategy, Strategic Plan, and Industry Persona documents. Identify misalignments, outdated content, and generate a comprehensive report.

**Output:** Report only (no auto-fixes). User will review and decide what to update.

## USER DECISIONS (Pre-Configured)
These decisions were made before running:
1. **Demographics:** Update ALL references to "30-55" (not 50-65 or 55+)
2. **Scope:** Include ALL 40+ industry persona files
3. **Action:** Report only - flag issues, don't auto-fix
4. **Standard:** BRAND-REFRESH-MANIFESTO.md is THE definitive standard

## COMPLETION CRITERIA
Output `<promise>BRAND_AUDIT_COMPLETE</promise>` ONLY when:
- [ ] All 8 Brand Strategy documents reviewed
- [ ] All 10 Quick Wins documents reviewed
- [ ] All 7 Strategic documents reviewed
- [ ] All 40 Industry Persona documents reviewed
- [ ] BRAND-CONTENT-ALIGNMENT-REPORT.md created with all findings
- [ ] Summary section added with issue counts and change list

---

## OUTPUT FILE
Create and update: `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/BRAND-CONTENT-ALIGNMENT-REPORT.md`

---

## REFERENCE DOCUMENT (The Definitive Standard)
Read first: `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/BRAND-REFRESH-MANIFESTO.md`

Key standards to check against:
- **Target demographic:** 30-55 year old business owners (UPDATE any 50-65, 55+, "older" references)
- **Visual:** Bold typography (72px+), 10-12px button radius, layered shadows
- **Feel:** "Confident and premium" not "professional and safe"
- **Keep:** Navy/Gold palette, Crimson Pro + DM Sans, Heron symbol, "Certainty First"
- **Avoid:** Dated patterns from 2018-2020

---

## DOCUMENTS TO AUDIT

### PHASE 1: Core Brand Strategy (Iterations 1-8)

| # | File | Path | Status |
|---|------|------|--------|
| 1 | Current Brand Audit | Strategic Plan/Dec 2025/Brand Strategy/01-current-brand-audit.md | [ ] |
| 2 | Business Strategic Synthesis | Strategic Plan/Dec 2025/Brand Strategy/02-business-strategic-synthesis.md | [ ] |
| 3 | Persona Audience Insights | Strategic Plan/Dec 2025/Brand Strategy/03-persona-audience-insights.md | [ ] |
| 4 | Competitive Positioning | Strategic Plan/Dec 2025/Brand Strategy/04-competitive-positioning.md | [ ] |
| 5 | Brand Positioning Framework | Strategic Plan/Dec 2025/Brand Strategy/05-brand-positioning-framework.md | [ ] |
| 6 | Messaging Architecture | Strategic Plan/Dec 2025/Brand Strategy/06-messaging-architecture.md | [ ] |
| 7 | Brand Voice Guidelines | Strategic Plan/Dec 2025/Brand Strategy/07-brand-voice-guidelines.md | [ ] |
| 8 | Visual Identity Direction | Strategic Plan/Dec 2025/Brand Strategy/08-visual-identity-direction.md | [ ] |

### PHASE 2: Quick Wins & Messaging (Iterations 9-18)

| # | File | Path | Status |
|---|------|------|--------|
| 9 | Tagline Recommendation | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/01-tagline-recommendation.md | [ ] |
| 10 | Metaphor Hierarchy | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/02-metaphor-hierarchy.md | [ ] |
| 11 | Words Use Avoid | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/03-words-use-avoid.md | [ ] |
| 12 | Voice Pronoun Guidelines | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/04-voice-pronoun-guidelines.md | [ ] |
| 13 | Heron Narrative Bridge | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/05-heron-narrative-bridge.md | [ ] |
| 14 | Proof Vocabulary Palette | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/06-proof-vocabulary-palette.md | [ ] |
| 15 | Email Signature CTAs | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/07-email-signature-ctas.md | [ ] |
| 16 | LinkedIn CTA Messaging | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/08-linkedin-cta-messaging.md | [ ] |
| 17 | Message Repetition Guidelines | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/09-message-repetition-guidelines.md | [ ] |
| 18 | Anti-Positioning Statements | Strategic Plan/Dec 2025/Deliverables/logos/v4/quick-wins/10-anti-positioning-statements.md | [ ] |

### PHASE 3: Strategic Documents (Iterations 19-25)

| # | File | Path | Status |
|---|------|------|--------|
| 19 | Brand Strategy Synthesis | Strategic Plan/Dec 2025/Deliverables/brand-strategy-synthesis.md | [ ] |
| 20 | Brand Positioning Framework | Strategic Plan/Dec 2025/Deliverables/brand-positioning-framework.md | [ ] |
| 21 | Persona Insights Brand Strategy | Strategic Plan/Dec 2025/Deliverables/persona-insights-brand-strategy.md | [ ] |
| 22 | Strategic Recommendations | Strategic Plan/Dec 2025/Working Documents/strategic-recommendations.md | [ ] |
| 23 | Business Context | Strategic Plan/Dec 2025/Working Documents/business-context.md | [ ] |
| 24 | Creative Brief v4 | Strategic Plan/Dec 2025/Deliverables/logos/v4/creative-brief-v4.md | [ ] |
| 25 | Brand Audit Workspace | Strategic Plan/Dec 2025/Deliverables/logos/v4/brand-audit-workspace.md | [ ] |

### PHASE 4: Industry Personas (Iterations 26-65)

Audit ALL 40 persona files for demographic and messaging alignment.

**Path:** `Strategic Plan/Dec 2025/Target Personas/`

| # | File | Status |
|---|------|--------|
| 26 | 01-Construction-General-Contractors.md | [ ] |
| 27 | 02-Manufacturing-SMB.md | [ ] |
| 28 | 03-Trucking-Logistics.md | [ ] |
| 29 | 04-Auto-Dealerships.md | [ ] |
| 30 | 05-Dental-Practices.md | [ ] |
| 31 | 06-Veterinary-Practices.md | [ ] |
| 32 | 07-Funeral-Homes.md | [ ] |
| 33 | 08-Real-Estate-Brokerages.md | [ ] |
| 34 | 09-Property-Management.md | [ ] |
| 35 | 10-Landscaping-Lawn-Care.md | [ ] |
| 36 | 11-Pest-Control.md | [ ] |
| 37 | 12-Senior-Care.md | [ ] |
| 38 | 13-Auto-Repair.md | [ ] |
| 39 | 14-Childcare-Daycare.md | [ ] |
| 40 | 15-Independent-Pharmacies.md | [ ] |
| 41 | 16-Optometry-Eye-Care.md | [ ] |
| 42 | 17-Commercial-Cleaning.md | [ ] |
| 43 | 18-Staffing-Agencies.md | [ ] |
| 44 | 19-Self-Storage.md | [ ] |
| 45 | 20-Moving-Companies.md | [ ] |
| 46 | 21-Printing-Sign-Shops.md | [ ] |
| 47 | 22-Agriculture-Farming.md | [ ] |
| 48 | 23-Security-Services.md | [ ] |
| 49 | 24-Fitness-Gyms.md | [ ] |
| 50 | 25-Medical-Equipment.md | [ ] |
| 51 | 26-Healthcare-Clinics.md | [ ] |
| 52 | 27-Restaurants-Food.md | [ ] |
| 53 | 28-Hotels-Hospitality.md | [ ] |
| 54 | 29-Physical-Therapy.md | [ ] |
| 55 | 30-Chiropractic.md | [ ] |
| 56 | 31-Plumbing.md | [ ] |
| 57 | 32-Electrical.md | [ ] |
| 58 | 33-Roofing.md | [ ] |
| 59 | 34-Pool-Service.md | [ ] |
| 60 | 35-HVAC.md | [ ] |
| 61 | 36-Tax-Bookkeeping.md | [ ] |
| 62 | 37-Waste-Junk.md | [ ] |
| 63 | 38-Home-Health.md | [ ] |
| 64 | 39-Towing.md | [ ] |
| 65 | 40-Credit-Unions.md | [ ] |

**For Personas, specifically check:**
- Owner/decision-maker age references (should be 30-55)
- Messaging tone (confident vs safe)
- Any visual direction guidance
- Language that contradicts brand positioning

### PHASE 5: Summary (Iterations 66-75)

Compile all findings into final report and output `<promise>BRAND_AUDIT_COMPLETE</promise>`

---

## BASE PATH
`/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/`

---

## FOR EACH DOCUMENT

### Step A: Read the Document
```bash
cat "[BASE_PATH]/[document_path]"
```

### Step B: Compare Against Manifesto
Check for these alignment issues:

**1. Demographic Alignment**
- Does it say "50-65" or "55+"? → Should say "30-55"
- Does it reference "older" audience without acknowledging younger clients?

**2. Visual Direction Conflicts**
- Does it recommend small/safe typography?
- Does it suggest minimal border-radius (2-4px)?
- Does it describe flat, static design?
- Does it mention dated patterns (carousels, pop-ups, etc.)?

**3. Tone/Positioning Gaps**
- Does it say "professional and safe" vs "confident and premium"?
- Does it use language that feels stagnant?
- Are there contradictions with "bold but not flashy"?

**4. Content That Needs Updating**
- References to old design standards
- Messaging that doesn't match current positioning
- Guidelines that conflict with modern best practices

### Step C: Document Findings
Add to BRAND-CONTENT-ALIGNMENT-REPORT.md:

```markdown
## [Document Name]
**File:** [path]
**Status:** [ALIGNED | NEEDS UPDATE | CRITICAL CONFLICT]

### Alignment Issues
- [Issue description with specific quote from document]

### Proposed Changes
- [Specific change needed]

### Decisions Needed
- [ ] [Decision required from user]

---
```

### Step D: Move to Next Document

---

## REPORT TEMPLATE

Create `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/BRAND-CONTENT-ALIGNMENT-REPORT.md`:

```markdown
# Brand & Content Alignment Report

**Generated:** [Date]
**Reference:** BRAND-REFRESH-MANIFESTO.md
**Documents Reviewed:** [count]

---

## EXECUTIVE SUMMARY

### Documents by Status
| Status | Count | Documents |
|--------|-------|-----------|
| ALIGNED | [#] | [list] |
| NEEDS UPDATE | [#] | [list] |
| CRITICAL CONFLICT | [#] | [list] |

### Top Issues Found
1. [Issue]
2. [Issue]
3. [Issue]

---

## DECISIONS NEEDED (User Action Required)

| # | Decision | Document(s) | Impact |
|---|----------|-------------|--------|
| 1 | [Question] | [file] | [High/Med/Low] |

---

## PROPOSED CHANGES (Can Execute Autonomously)

| # | Change | Document(s) | Effort |
|---|--------|-------------|--------|
| 1 | [Change] | [file] | [Est time] |

---

## DETAILED FINDINGS BY DOCUMENT

[Individual document sections here]

---

## APPENDIX: KEY QUOTES THAT CONFLICT

| Document | Current Text | Should Be |
|----------|--------------|-----------|
| [file] | "[quote]" | "[suggested]" |

```

---

## SEVERITY DEFINITIONS

- **ALIGNED:** Document matches manifesto, no changes needed
- **NEEDS UPDATE:** Minor conflicts or outdated content, easy fixes
- **CRITICAL CONFLICT:** Major misalignment that could confuse brand execution

---

## CATEGORIES OF ISSUES TO FLAG

1. **Demographic Mismatch** - Wrong age range specified
2. **Visual Direction Conflict** - Outdated design recommendations
3. **Tone Inconsistency** - Language that contradicts brand personality
4. **Stale Content** - References to old strategies or positioning
5. **Missing Updates** - Doesn't reflect current "Certainty First" positioning
6. **Technical Debt** - Outdated CSS/design specifications

---

## ESCAPE HATCH
If stuck after 70 iterations:
1. Document what's blocking progress
2. List documents completed vs remaining
3. Output `<promise>BRAND_AUDIT_COMPLETE</promise>` with partial results noted

## EFFICIENCY TIP
For Phase 4 (Personas), batch process by scanning for common patterns:
1. Search all files for age-related keywords: "50", "55", "60", "65", "older", "senior"
2. Flag any files containing these patterns
3. Document only files that NEED updates (skip fully aligned files)
4. In summary, list "X of 40 personas aligned, Y need updates"

---

## SELF-CORRECTION
If a file doesn't exist:
1. Log as "FILE NOT FOUND"
2. Continue to next document
3. Note in summary that file was missing
