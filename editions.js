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
  // WEEK 02 · MAY · 2026
  // Window: 2026-05-07 → 2026-05-14
  // Repos: webv4-main (new-design), webv4-backend-main (main),
  // webv4-backend-node (main), fp-mobile-app2 (kimi), portal (master)
  // ─────────────────────────────────────────────────────────
  {
    id: 'may-w2-2026',
    week: 'Week 02',
    month: 'May',
    year: 2026,
    dateRange: 'May 07 — May 14, 2026',
    headline: 'Portal team-management. Tap to Pay on mobile. Sheets filtering + bulk ops. Mobile v3. Encrypted tenant secrets. Web design refresh.',
    summary: 'Cross-repo week — most items touched two or more repos: webv4, both backends, mobile (kimi branch), and the internal portal. Each card below covers one shipped area.',
    isLatest: true,
    updates: [

      // ── Intro note ──────────────────────────────
      {
        type: 'note',
        size: 'wide',
        icon: '📍',
        title: 'Week 01 of Field Notes — and a big shipping week.',
        description: 'Seven feature areas landed across five repos. Below: portal team-management, mobile Tap to Pay, encrypted secrets, sheets upgrade, mobile design system migration, mobile query logs, and a cross-cutting web design refresh — plus misc fixes.'
      },

      // ── B. Portal team-management ──────────────
      {
        type: 'shipped',
        size: 'lg',
        icon: '👥',
        title: 'Portal: members, RBAC, audit log, password reset',
        description: 'The internal portal now has full team-management. Owners can invite new members at three role tiers — owner, admin, read-only — with an invite email and first-login flow. RBAC is enforced on both UI and backend: read-only members see destructive controls hidden in the UI and the backend rejects the same calls if invoked directly. Every action (member add/remove, integration disconnect, AI editor toggle) writes to an audit log viewable from a new modal — actor, target, timestamp, and a details drill-in per event. Members can change their own password from a dedicated modal with validation for current password and new-password strength.'
      },

      // ── F. Mobile Stripe Tap to Pay (tall, beside B) ──
      {
        type: 'shipped',
        size: 'tall',
        icon: '💳',
        title: 'Tap to Pay on mobile (real Stripe)',
        description: 'The mobile app now takes card payments via Stripe Tap to Pay on supported readers. Charges include the correct location_id so payments land in the right Stripe location. Simulator mode is available for testing. Decline and network-loss paths surface clear errors without orphan charges. Stacked confirmation dialogs unwind cleanly on success. Receipt action fires post-payment.'
      },

      // ── D. Tenant-scoped secrets ───────────────
      {
        type: 'shipped',
        size: 'lg',
        icon: '🔐',
        title: 'Encrypted tenant secrets for API keys and tokens',
        description: 'Admins can now manage credentials per tenant from Settings → Secrets. Values are encrypted at rest, write-only (never returned to any client after save), and substituted server-side just before an outbound API call inside <code>/data/serverAPICall</code> — the plaintext never reaches the browser or mobile device. Reference a secret inside any API action’s url, headers, or body as <code>{{secrets.NAME}}</code>. Non-admins get 403 on the management endpoint. Missing secrets return <code>400 Unknown secret(s): NAME</code> and the upstream request is not dispatched. Mobile actions can also substitute secrets via the server-side proxy — documented in the mobile actions docs.'
      },

      // ── H. Mobile query logs (tall, beside D) ──
      {
        type: 'shipped',
        size: 'tall',
        icon: '🔍',
        title: 'Mobile query logs + debugging panel',
        description: 'A new panel inside the mobile app shows every query request with params, status, and timing — useful for diagnosing field-side issues without leaving the device. Color-conditional widgets now dedupe rapid invalidations and clear caches correctly, fixing flicker on fast successive updates.'
      },

      // ── E. Sheets — filtering, bulk ops, CSV import ──
      {
        type: 'shipped',
        size: 'lg',
        icon: '📊',
        title: 'Sheets: advanced filtering, bulk actions, smarter CSV import',
        description: 'Multi-rule filters now combine with AND across string, number, date, and multi-select columns — each operator works per column type. Date-equality filters expand to a full day range, so <code>date == 2026-05-12</code> matches the entire day instead of one exact timestamp. List widget supports multi-select with checkbox + bulk actions (delete, update) and shows progress to completion. Pagination is now a dedicated widget with configurable page sizes (10 / 50 / 200). Wide grids keep a persistent horizontal scrollbar. CSV import accepts rows with a blank <code>id</code> column and auto-generates IDs. From the portal, sheet schema drift between the live DB and saved config can be detected and reconciled in one click. Sheets section is now admin-gated.'
      },

      // ── G. Mobile v3 design system (tall, beside E) ──
      {
        type: 'improved',
        size: 'tall',
        icon: '🎨',
        title: 'Mobile rebuilt on v3 design system',
        description: 'Forms (text, number, dropdown, multiselect), image input, dialogs (confirm/info/error), signature pad, and auth screens are all migrated to v3 colors and components. New splash screen with staggered animations that don’t block first paint. Long-press on text now copies to clipboard. Ships as version 1.0.15 with Android SDK bump, iOS build cleanup, and dependency fixes — installs cleanly on Android 10/13/14 and iOS 16/17.'
      },

      // ── I. webv4 design refresh ────────────────
      {
        type: 'improved',
        size: 'lg',
        icon: '✨',
        title: 'Web app design refresh (cross-cutting)',
        description: 'New color palette and typography across the web app. SVG logo lockup replaces the icon-only brand mark, including a sliced-SVG sidebar variant that stays sharp at all widths. Split-layout redesign on the login screen. Button heights and primary-button text contrast unified across screens. Shared dialog primitives and consistent date-picker styling. Map widgets stop showing grey tiles in Chrome and now respect zoom bounds. Bar charts handle long labels without overflow and pivot tables fit wide configurations. HTML embeds support internal scroll via <code>enable_scroll</code>. View navigation no longer pops unintended routes on deep-link back. Query debugger (web) gets a parameter dialog with reactive value updates without pointer-interception bugs. <code>/docs</code> route is now blocked on production builds and allowed on staging.'
      },

      // ── prevent_double_click (tall, beside I) ──
      {
        type: 'shipped',
        size: 'tall',
        icon: '🛡',
        title: 'Buttons: prevent_double_click option',
        description: 'Buttons can now set <code>prevent_double_click: true</code> to ignore repeat clicks on the same button (and same row, for list-rendered buttons) while the previous action chain is still running. Use on submit/save buttons to avoid duplicate records from fast double-clicks. The element must have an <code>element_id</code> for this to take effect. Documented in the mobile actions docs.'
      },

      // ── Misc small cards ───────────────────────
      {
        type: 'fixed',
        size: 'sm',
        icon: '·',
        title: 'isProduction flag fix',
        description: 'Production-only gating (debug logs, /docs route) now respects the flag correctly in real production builds.'
      },
      {
        type: 'shipped',
        size: 'sm',
        icon: '·',
        title: 'OpenRouter + Mail Vault env keys',
        description: 'Backend env wiring added for OpenRouter and Mail Vault — prereq for upcoming AI and email routes.'
      },
      {
        type: 'fixed',
        size: 'sm',
        icon: '·',
        title: 'Portal infra cleanup',
        description: 'react-router-dom downgraded to v6, .nvmrc added, API base URL config updated, favicon refreshed, unused mobile deps removed (flutter_inappwebview, pivot_table).'
      }
    ]
  }

  // Next week's entry goes here ↑↑↑
];
