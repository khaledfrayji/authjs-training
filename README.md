# Techtalks Bank

A responsive, client-side banking dashboard prototype built with Next.js, TypeScript, and Tailwind CSS. All account details, balances, and activity are fictional sample data.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/dashboard`.

## Demo behavior

- The dashboard starts with deterministic USD data for Alex Morgan and Studio North, dated October 10, 2026.
- Search, account/status/direction filters, period selection, account and transaction details, pagination, and CSV export work entirely in the browser.
- Internal transfers move funds between the two fictional accounts in memory. No payment is requested or sent.
- Refreshing restores the original fixture. Use **Reset demo** to restore it without refreshing.
- CSV exports the complete currently filtered result set, not only the visible page. Spreadsheet formula prefixes in text values are neutralized.
- Use `?scenario=empty` or `?scenario=error` in development to inspect the empty and recoverable error states. The profile menu also exposes these fixtures during local development.

## Limitations

This is an in-memory demonstration, not a financial service. It has no database, API, authentication, real bank connection, account number, payment rail, or persistence. The interface uses native semantic form controls and dialogs with Tailwind styling; it intentionally does not add a component-library runtime dependency to the existing minimal project.
