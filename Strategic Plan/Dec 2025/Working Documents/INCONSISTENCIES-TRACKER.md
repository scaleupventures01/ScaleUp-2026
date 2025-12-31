# Persona Research Report - Inconsistencies Tracker

**Created:** December 31, 2025
**Status:** In Progress
**Source of Truth:** `master-industry-ranking.html`

---

## Master Ranking (Authoritative Scores)

| Rank | Industry | Score | Tier |
|------|----------|-------|------|
| 1 | Staffing Agencies | 67/80 | Tier 1 |
| 2 | Veterinary Practices | 65/80 | Tier 1 |
| 3 | Pest Control Services | 64/80 | Tier 2 |
| 4 | Trucking/Logistics | 63/80 | Tier 2 |
| 5 | Property Management | 63/80 | Tier 2 |
| 6-12 | Trades (Plumbing, Electrical, HVAC, Roofing, etc.) | 63/80 | Tier 2 |
| 13-22 | Professional Services, Insurance, etc. | 60-62/80 | Tier 3 |

---

## INCONSISTENCIES FOUND

### 1. NAV MENU - Wrong Persona Order
**Location:** `persona-research-report.html` lines 821-827
**Status:** [ ] PENDING

**Current (Wrong):**
```html
<a href="#persona-staffing" class="nav-link">1. Staffing Agencies (67/80)</a>
<a href="#persona-trades" class="nav-link">2. Trades Super-Cluster (63/80)</a>
<a href="#persona1" class="nav-link">3. Professional Services</a>
<a href="#persona2" class="nav-link">4. Insurance Agencies</a>
<a href="#persona4" class="nav-link">5. New Legal (Guarantee)</a>
```

**Should Be:**
```html
1. Staffing Agencies (67/80) - CORRECT
2. Veterinary Practices (65/80) - MISSING
3. Pest Control Services (64/80) - MISSING
4. Trades Super-Cluster (63/80) - Should be #4
5. Professional Services (62/80)
6. Insurance Agencies (62/80)
7. New Legal (58/80)
```

**Issue:** Veterinary (#2, 65/80) and Pest Control (#3, 64/80) are completely missing from the nav. Trades is incorrectly listed as #2.

---

### 2. EXECUTIVE SUMMARY - Wrong Persona Count
**Location:** `persona-research-report.html` lines 863-864
**Status:** [ ] PENDING

**Current (Wrong):**
```html
<strong>5 Validated</strong>
Priority Personas
```

**Should Be:**
```
7 Validated Priority Personas
```
(Staffing, Veterinary, Pest Control, Trades, Professional Services, Insurance, Legal)

---

### 3. MARKET SIZING TABLE - Missing Industries & Wrong Order
**Location:** `persona-research-report.html` lines 1947-2012
**Status:** [X] DONE

**Current Table (Wrong Order):**
| Persona | Score | Priority |
|---------|-------|----------|
| Staffing Agencies | 67/80 | TOP |
| Trades Super-Cluster | 63/80 | HIGH |
| Professional Services | 62/80 | High |
| Insurance Agencies | 62/80 | High |
| New Legal | 58/80 | Medium |

**Should Be:**
| Persona | Score | Priority |
|---------|-------|----------|
| Staffing Agencies | 67/80 | TOP |
| Veterinary Practices | 65/80 | HIGH |
| Pest Control Services | 64/80 | HIGH |
| Trades Super-Cluster | 63/80 | HIGH |
| Professional Services | 62/80 | Medium |
| Insurance Agencies | 62/80 | Medium |
| New Legal | 58/80 | Lower |

**Issues:**
- Missing Veterinary Practices (65/80)
- Missing Pest Control Services (64/80)
- Wrong priority badges (Prof Services/Insurance should be Medium, not High)

---

### 4. MISSING PERSONA SECTIONS
**Location:** `persona-research-report.html` Section 04
**Status:** [X] DONE

**Missing:** (FIXED)
- **Veterinary Practices persona section** - #2 ranked at 65/80 - ADDED id="persona-veterinary"
- **Pest Control Services persona section** - #3 ranked at 64/80 - ADDED id="persona-pest-control"

**Existing sections:**
- Staffing Agencies (67/80) - EXISTS at line 1286
- Trades Super-Cluster (63/80) - EXISTS at line 1391
- Professional Services (62/80) - EXISTS at line 1493
- Insurance Agencies (62/80) - EXISTS at line 1600
- New Legal (58/80) - EXISTS at line 1809

---

### 5. BOTTOM LINE SECTION - Incomplete Winners List
**Location:** `persona-research-report.html` lines 2410-2424
**Status:** [X] DONE

**Current (Wrong):**
> "40 industries researched. 2 clear winners identified."
> Only mentions Staffing (67/80) and Trades (63/80)

**Should Mention:**
- Staffing Agencies (67/80) - #1
- Veterinary Practices (65/80) - #2
- Pest Control Services (64/80) - #3
- Trades Super-Cluster (63/80) - #4

**Issue:** Veterinary and Pest Control are ranked HIGHER than Trades but not mentioned as winners.

---

### 6. SUMMARY CARDS - Wrong "Industries at 63+" Count
**Location:** `persona-research-report.html` lines 903-904
**Status:** [ ] PENDING

**Current:**
```html
<div class="summary-value">12</div>
<div class="summary-label">Industries at 63+</div>
```

**Verification Needed:** Count from master-industry-ranking.html shows:
- 67/80: 1 (Staffing)
- 65/80: 1 (Veterinary)
- 64/80: 1 (Pest Control)
- 63/80: 9 (Trucking, Property Mgmt, Plumbing, Electrical, Roofing, HVAC, Waste, Home Health, Towing)

**Total at 63+: 12** - This appears CORRECT

---

### 7. RECOMMENDATIONS SECTION - Missing Veterinary/Pest Control Campaigns
**Location:** `persona-research-report.html` lines 2352-2408
**Status:** [X] DONE

**Current Timeline:**
- Immediate: Launch Google Ads for Staffing Agencies
- Week 2: Create Staffing Case Study
- Week 3-4: Launch Trades Super-Cluster Campaign
- Month 2: Join Trade Associations
- Month 3: Test Secondary Verticals

**Issue:** No mention of Veterinary (65/80) or Pest Control (64/80) campaigns, even though they score HIGHER than Trades (63/80).

---

### 8. VALIDATION BOX TEXT - Incomplete Top Performers
**Location:** `persona-research-report.html` lines 885-890
**Status:** [ ] PENDING

**Current:**
> "Staffing Agencies scored highest (67/80), with the Trades Super-Cluster representing the largest combined opportunity at 63/80 each."

**Issue:** Skips over Veterinary (65/80) and Pest Control (64/80) entirely. These are #2 and #3 ranked.

---

## FIX PRIORITY ORDER

1. [X] Create Veterinary Practices persona section (65/80)
2. [X] Create Pest Control Services persona section (64/80)
3. [ ] Update nav menu with correct order and all 7 personas
4. [ ] Update market sizing table with all industries in correct order
5. [ ] Update executive summary persona count (5 → 7)
6. [ ] Update validation box text to mention Vet/Pest Control
7. [X] Update Bottom Line section with all 4 top winners
8. [X] Update Recommendations to include Vet/Pest Control campaigns

---

## COMPLETION LOG

| # | Fix | Completed | Notes |
|---|-----|-----------|-------|
| 1 | Veterinary persona section | [X] DONE | Added Dr. Patricia persona with 65/80 score, demographics, pain points, market sizing (TAM $2.3B, SAM $115M, SOM $350-500K), acquisition channels |
| 2 | Pest Control persona section | [X] DONE | Added Mike persona with 64/80 score, demographics (50+, $1M-$8M, 15-50 techs), pain points (seasonal demand, route optimization, national chain competition, no online scheduling), market sizing (TAM $2.1B, SAM $84M, SOM $350-500K), acquisition channels (NPMA, PestWorld, PCT Magazine) |
| 3 | Nav menu | [X] DONE | Updated to show all 7 personas in correct order |
| 4 | Market sizing table | [X] DONE | Added Veterinary (65/80) and Pest Control (64/80), fixed order and priority badges, updated totals to Top 7 |
| 5 | Executive summary count | [X] | DONE - Changed to 7 Validated |
| 6 | Validation box text | [X] | DONE - Added Veterinary (65/80) and Pest Control (64/80) |
| 7 | Bottom Line section | [X] DONE | Updated "2 clear winners" to "4 clear winners", added Veterinary (65/80) and Pest Control (64/80) descriptions |
| 8 | Recommendations section | [X] DONE | Added Week 2-3 Veterinary Practice campaigns and Week 3 Pest Control campaigns |

---

*This document tracks all inconsistencies between `master-industry-ranking.html` (source of truth) and `persona-research-report.html` (main report).*
