import { ilmAnalyticsGranted } from './src/lib/intentlm-consent'

/**
 * intentLM SDK configuration.
 * useRemoteConfig: load patterns/views from dashboard via same-origin proxy.
 * Proxy: /api/intentlm/sdk/instrumentation → Config API (local: Vite proxy / Next rewrites; prod: vercel.json).
 * consentCheck defaults open for setup — wire CMP before production.
 */
export const intentLMConfig = {
  apiKey: 'ilm_live_plwhs3sbx0db2rab5iohklrapcwok52g',
  endpoint: 'https://intentlm-dev-inference-krxe5fa7dq-uw.a.run.app/v1',
  useRemoteConfig: true,
  configBaseUrl: '/api/intentlm',
  consentCheck: () => typeof window !== 'undefined' && ilmAnalyticsGranted(),
  enableVisitorPersistence: true,
  patterns: {
  "/": 101,
  "/booking*": 1536,
  "/checkout*": 203,
  "/dashboard*": 805,
  "/login*": 110,
  "/photographer-dashboard*": 805,
  "/signup*": 111
},
  views: {
  "route.wildcard": 801,
  "route.post-booking.bookingid": 1536
},
}
