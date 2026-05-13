/* ============================================================
   THE DISPATCH — EDITIONS DATA
   ------------------------------------------------------------
   To add a new week, copy a block and place it at the TOP of
   the EDITIONS array. The newest edition always appears first.

   FIELDS:
     id          unique slug, used in URL hash for deep links
     volume      e.g. "Vol. 02"  (auto-incremented order is fine too)
     week        e.g. "Week 02"
     month       e.g. "May"
     year        e.g. 2026
     dateRange   human-readable date span
     headline    the big serif title for the edition
     summary     one paragraph intro (optional)
     isLatest    set true for the most recent — adds the LIVE badge
     updates     array of cards (see types & sizes below)

   CARD TYPES:  new | improved | fixed | coming | milestone
   CARD SIZES:  sm | md | lg | wide | tall
   ============================================================ */

const EDITIONS = [

  // ─────────────────────────────────────────────────────────
  // EDITION 01 · MAY · WEEK 02 · 2026
  // (Placeholder — real content will be filled in by Keerthanaa)
  // ─────────────────────────────────────────────────────────
  {
    id: 'may-w2-2026',
    volume: 'Vol. 01',
    week: 'Week 02',
    month: 'May',
    year: 2026,
    dateRange: 'May 11 — May 17, 2026',
    headline: 'The first edition lands. <em>A new rhythm</em> begins.',
    summary: "This is the inaugural Dispatch — a weekly rundown of everything that shipped, improved, or is about to land. Cards below are placeholders, ready for this week's real updates.",
    isLatest: true,
    updates: [
      {
        type: 'milestone',
        size: 'wide',
        icon: '🎉',
        title: 'Edition 01 — Hello, team.',
        description: 'This is the very first Dispatch. From now on, every week the highlights of what we built will live here, in one scrollable place. Send the link, ship the story.'
      },
      {
        type: 'new',
        size: 'lg',
        icon: '🚀',
        title: 'Headline feature goes here',
        description: 'Replace this card with the most important launch of the week. Use the large card for things that deserve the spotlight — anchor launches, big rollouts, flagship capabilities.'
      },
      {
        type: 'improved',
        size: 'md',
        icon: '⚡',
        title: 'A notable improvement',
        description: 'Performance wins, UX polish, refinements that customers will feel — drop them in medium cards.'
      },
      {
        type: 'fixed',
        size: 'md',
        icon: '🔧',
        title: 'Fixes that mattered',
        description: 'Grouped bug fixes or a single big one — medium card works well here.'
      },
      {
        type: 'coming',
        size: 'tall',
        icon: '🔭',
        title: 'On the horizon',
        description: 'A taller card for what is coming next — gives the reader something to look forward to.'
      },
      {
        type: 'new',
        size: 'sm',
        icon: '✨',
        title: 'Small but mighty',
        description: 'Smaller capabilities or quality-of-life shipments fit nicely in the small cards.'
      },
      {
        type: 'improved',
        size: 'sm',
        icon: '📈',
        title: 'A quick number',
        description: 'Use small cards for metrics, stats, or one-liner wins.'
      }
    ]
  }

  // Add the next week up here ↑↑↑ when the time comes.
];
