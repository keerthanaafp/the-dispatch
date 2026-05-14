/* ============================================================
   FIELD NOTES — WEEKLY UPDATE ENTRIES
   ------------------------------------------------------------
   Add a new week by placing a new block at the TOP of the
   ENTRIES array. The newest week always appears first.

   FIELDS:
     id          unique slug, used in URL hash for deep links
     week        e.g. "Week 02"
     month       e.g. "May"
     year        e.g. 2026
     dateRange   human-readable date span
     headline    short, factual title for the week
     summary     one-line intro (optional)
     isLatest    set true for the most recent week
     updates     array of update cards

   CARD TYPES:  shipped | improved | fixed | next | note
   CARD SIZES:  sm | md | lg | wide | tall
   ============================================================ */

const EDITIONS = [

  // ─────────────────────────────────────────────────────────
  // WEEK 02 · MAY · 2026  (placeholder — to be filled in)
  // ─────────────────────────────────────────────────────────
  {
    id: 'may-w2-2026',
    week: 'Week 02',
    month: 'May',
    year: 2026,
    dateRange: 'May 11 — May 17, 2026',
    headline: 'Week of May 11 — 17, 2026',
    summary: 'Placeholder cards. Send the real week-02 updates and these get replaced.',
    isLatest: true,
    updates: [
      {
        type: 'note',
        size: 'wide',
        icon: '📍',
        title: 'Week 01 of Field Notes',
        description: 'This is the first weekly log. From now on, every Friday a new entry lands here with what shipped, what improved, what got fixed, and what is coming next.'
      },
      {
        type: 'shipped',
        size: 'lg',
        icon: '📦',
        title: 'Biggest launch of the week goes here',
        description: 'Large card. Use this for the headline launch of the week — a new feature, a new module, a flagship release. One short paragraph is enough.'
      },
      {
        type: 'improved',
        size: 'md',
        icon: '↑',
        title: 'A notable improvement',
        description: 'Medium card. Performance, UX, or workflow improvements customers will feel.'
      },
      {
        type: 'fixed',
        size: 'md',
        icon: '✓',
        title: 'A fix that mattered',
        description: 'Medium card. A bug fix or group of fixes that was either user-reported or visible enough to call out.'
      },
      {
        type: 'next',
        size: 'tall',
        icon: '→',
        title: 'Coming next week',
        description: 'Tall card. Use for what is in progress and likely to ship in the next entry. Keeps the team looking forward.'
      },
      {
        type: 'shipped',
        size: 'sm',
        icon: '·',
        title: 'A small shipment',
        description: 'Small card. Quality-of-life updates, minor settings, one-line wins.'
      },
      {
        type: 'improved',
        size: 'sm',
        icon: '·',
        title: 'A stat or metric',
        description: 'Small card. Good for numbers — "API latency down 30%", "Reports load 2× faster".'
      }
    ]
  }

  // Next week's entry goes here ↑↑↑
];
