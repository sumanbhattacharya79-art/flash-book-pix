# intentLM proxy

Production apps should load SDK config through a **same-origin** proxy (no CORS):

- Browser: `/api/intentlm/sdk/instrumentation`
- Upstream: `https://intentlm-dev-config-krxe5fa7dq-uw.a.run.app/v1/sdk/instrumentation`

`.intentlm.config.ts` sets `configBaseUrl: '/api/intentlm'`.

## Hosting

- **Vercel**: `vercel.json` rewrites included in this PR
- **Netlify**: `public/_redirects` included
- **Vite dev**: merge `intentlm-vite-proxy.snippet.js` into `vite.config` `server.proxy`
- **Next.js**: `next.config` rewrites merged when present (fallback: `intentlm-next-rewrites.js`)
